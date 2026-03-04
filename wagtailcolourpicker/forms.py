from django import forms
from django.utils.translation import gettext_lazy as _

from wagtailcolourpicker.utils.colour import get_colour_choices


class ColourRadioSelect(forms.widgets.RadioSelect):
    option_template_name = 'colourpicker/forms/widgets/colour_option.html'


class ColourForm(forms.Form):
    text_colour = forms.ChoiceField(
        label=_("Text colour"),
        widget=ColourRadioSelect,
        required=False
    )

    background_colour = forms.ChoiceField(
        label=_("Background colour"),
        widget=ColourRadioSelect,
        required=False
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['text_colour'].choices = get_colour_choices('text')
        self.fields['background_colour'].choices = get_colour_choices('background')
