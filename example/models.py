from wagtail.admin.panels import FieldPanel
from wagtail.blocks import RichTextBlock
from wagtail.fields import StreamField
from wagtail.models import Page


class BasicPage(Page):

    body = StreamField([
        ('rich_text', RichTextBlock())
    ], use_json_field=True)

    # show in menu ticked by default
    show_in_menus_default = True

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]
