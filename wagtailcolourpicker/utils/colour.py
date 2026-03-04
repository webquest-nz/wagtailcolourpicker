from wagtail.admin.rich_text.editors.draftail import features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import InlineStyleElementHandler

from wagtailcolourpicker.conf import get_setting


STYLE_TYPES = {
    'text': {
        'setting': 'COLOURS',
        'css_property': 'color',
        'feature_prefix': 'colour',
    },
    'background': {
        'setting': 'BACKGROUND_COLOURS',
        'css_property': 'background-color',
        'feature_prefix': 'background_colour',
    },
}

def get_feature_name(name, style_type='text'):
    feature = '%s_%s' % (STYLE_TYPES[style_type]['feature_prefix'], name)
    return feature

def get_colours(style_type='text'):
    style_config = STYLE_TYPES[style_type]
    return get_setting(style_config['setting'])


def get_colour_choices(style_type='text'):
    return tuple(get_colours(style_type).items())

def get_feature_name_upper(name, style_type='text'):
    return get_feature_name(name, style_type).upper()

def get_feature_name_list(style_type='text'):
    return [
        get_feature_name_upper(name, style_type)
        for name in get_colours(style_type).keys()
    ]

def register_color_feature(name, colour, features, style_type='text'):
    style_config = STYLE_TYPES[style_type]
    css_property = style_config['css_property']
    feature_name = get_feature_name(name, style_type)
    type_ = get_feature_name_upper(name, style_type)
    tag = 'span'
    detection = '%s[style="%s: %s;"]' % (tag, css_property, colour)

    control = {
        'type': type_,
        'icon': get_setting('ICON'),
        'description': colour,
        'style': {css_property: colour}
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.InlineStyleFeature(control)
    )

    features.register_converter_rule('contentstate', feature_name, {
        'from_database_format': {detection: InlineStyleElementHandler(type_)},
        'to_database_format': {
            'style_map': {
                type_: {
                    'element': tag,
                    'props': {
                        'style': {
                            css_property: colour
                        }
                    }
                }
            }
        },
    })

    features.default_features.append(feature_name)


def register_all_colour_features(features, style_type='text'):
    for name, colour in get_colours(style_type).items():
        register_color_feature(name, colour, features, style_type)

def get_list_colour_features_name(style_type='text'):
    """
    Add list names into your
    models.py RichTextField(features=[get_list_features_name()]
    """
    return [
        get_feature_name(name, style_type)
        for name in get_colours(style_type).keys()
    ]
