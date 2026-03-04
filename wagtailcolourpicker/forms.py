from django import forms
from django.utils.translation import gettext_lazy as _

from wagtailcolourpicker.utils.colour import get_colour_choices


class ColourRadioSelect(forms.widgets.RadioSelect):
    option_template_name = 'colourpicker/forms/widgets/colour_option.html'


class ColourForm(forms.Form):
    colour = forms.ChoiceField(
        label=_("Colours"),
        widget=ColourRadioSelect,
        required=False
    )

    style_type = forms.CharField(widget=forms.HiddenInput(), required=False)

    def __init__(self, *args, **kwargs):
        style_type = kwargs.pop('style_type', 'text')
        super().__init__(*args, **kwargs)
        self.fields['colour'].choices = get_colour_choices(style_type)
        self.fields['style_type'].initial = style_type
