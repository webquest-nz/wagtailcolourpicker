from wagtail.admin.modal_workflow import render_modal_workflow

from wagtailcolourpicker.forms import ColourForm
from wagtailcolourpicker.utils.colour import get_feature_name_list, get_feature_name_upper

DEFAULT_STYLE_TYPE = 'text'

def chooser(request):
    style_type = request.GET.get('style_type', DEFAULT_STYLE_TYPE)

    if request.method == 'POST':
        style_type = request.POST.get('style_type', style_type)
        form = ColourForm(request.POST, style_type=style_type)

        if form.is_valid():

            feature_name = ''
            if form.cleaned_data.get('colour'):
                feature_name = get_feature_name_upper(
                    form.cleaned_data.get('colour'),
                    style_type,
                )

            all_features = get_feature_name_list(style_type)

            return render_modal_workflow(
                request, None, None, None,
                json_data={
                    'step': 'colour_chosen',
                    'toggled_feature': feature_name,
                    'all_features': all_features
                }
            )
    else:
        form = ColourForm(style_type=style_type)

    return render_modal_workflow(
        request, 'colourpicker/chooser/chooser.html', None,
        {'form': form},
        json_data={'step': 'chooser'}
    )
