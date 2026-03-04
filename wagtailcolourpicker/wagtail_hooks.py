from django.urls import reverse, path, include
from django.utils.html import format_html
from django.utils.translation import gettext as _

from wagtail.admin.rich_text.editors.draftail import features as draftail_features
from wagtail import hooks

from wagtailcolourpicker.conf import get_setting
from wagtailcolourpicker.utils.colour import register_all_colour_features


@hooks.register('register_admin_urls')
def register_admin_urls():
    from wagtailcolourpicker import urls
    return [
        path('wagtailcolourpicker/', include((urls, 'wagtailcolourpicker'))),
    ]


@hooks.register('insert_editor_js')
def insert_editor_js():
    chooser_url = reverse('wagtailcolourpicker:chooser')
    js_includes = format_html(
        "<script>window.chooserUrls.colourChooser = '{0}?style_type=text';"
        "window.chooserUrls.backgroundColourChooser = '{0}?style_type=background';</script>",
        chooser_url,
    )
    return js_includes


@hooks.register('register_rich_text_features')
def register_textcolour_feature(features):
    # register all colour features
    register_all_colour_features(features, style_type='text')
    register_all_colour_features(features, style_type='background')
    #

    text_control = {
        'type': 'TEXTCOLOUR',
        'icon': get_setting('ICON'),
        'description': _('Text Colour'),
    }

    features.register_editor_plugin(
        'draftail',
        'textcolour',
        draftail_features.EntityFeature(
            text_control,
            js=[
                'colourpicker/js/chooser.js',
                'colourpicker/js/colourpicker.js',
            ],
            css={
                'all': ['colourpicker/css/colourpicker.css'],
            }
        )
    )

    background_control = {
        'type': 'BACKGROUNDCOLOUR',
        'icon': get_setting('ICON'),
        'description': _('Background Colour'),
    }

    features.register_editor_plugin(
        'draftail',
        'backgroundcolour',
        draftail_features.EntityFeature(
            background_control,
            js=[
                'colourpicker/js/chooser.js',
                'colourpicker/js/backgroundcolourpicker.js',
            ],
            css={
                'all': ['colourpicker/css/colourpicker.css'],
            }
        )
    )

    features.default_features.append('textcolour')
    features.default_features.append('backgroundcolour')
