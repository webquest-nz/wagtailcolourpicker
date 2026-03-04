from wagtail.admin.modal_workflow import render_modal_workflow

from wagtailcolourpicker.forms import ColourForm
from wagtailcolourpicker.utils.colour import get_feature_name_list, get_feature_name_upper

def chooser(request):
    if request.method == 'POST':
        form = ColourForm(request.POST)

        if form.is_valid():
            text_feature_name = ''
            background_feature_name = ''

            if form.cleaned_data.get('text_colour'):
                text_feature_name = get_feature_name_upper(
                    form.cleaned_data.get('text_colour'),
                    'text',
                )
            if form.cleaned_data.get('background_colour'):
                background_feature_name = get_feature_name_upper(
                    form.cleaned_data.get('background_colour'),
                    'background',
                )

            return render_modal_workflow(
                request, None, None, None,
                json_data={
                    'step': 'colour_chosen',
                    'toggled_text_feature': text_feature_name,
                    'toggled_background_feature': background_feature_name,
                    'all_text_features': get_feature_name_list('text'),
                    'all_background_features': get_feature_name_list('background'),
                }
            )
    else:
        form = ColourForm()

    return render_modal_workflow(
        request, 'colourpicker/chooser/chooser.html', None,
        {'form': form},
        json_data={'step': 'chooser'}
    )
