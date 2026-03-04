var React = window.React;
var EditorState = window.DraftJS.EditorState;
var Modifier = window.DraftJS.Modifier;
var RichUtils = window.DraftJS.RichUtils;

class CombinedColourSource extends React.Component {

    constructor(props) {
        super(props);

        this.onChosen = this.onChosen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        $(document.body).on('hidden.bs.modal', this.onClose);

        this.workflow = ModalWorkflow({
            url: window.chooserUrls.combinedColourChooser,
            onload: COLOURPICKER_CHOOSER_MODAL_ONLOAD_HANDLERS,
            responses: {
                colourChosen: this.onChosen
            }
        });
    }

    componentWillUnmount() {

        this.workflow = null;

        $(document.body).off('hidden.bs.modal', this.onClose);
    }

    onChosen(
        toggledTextColor,
        toggledBackgroundColor,
        textFeaturedColors,
        backgroundFeaturedColors
    ) {
        const { editorState, onComplete } = this.props;
        const selection = editorState.getSelection();
        const allFeaturedColors = textFeaturedColors.concat(backgroundFeaturedColors);

        // Remove existing configured text/background colours before applying new selections.
        const nextContentState = allFeaturedColors
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color);
            }, editorState.getCurrentContent());

        var nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        if (selection.isCollapsed()) {
            nextEditorState = allFeaturedColors.reduce((state, color) => {
                if (currentStyle.has(color)) {
                    return RichUtils.toggleInlineStyle(state, color);
                }
                return state;
            }, nextEditorState);
        }

        if (toggledTextColor && !currentStyle.has(toggledTextColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledTextColor
            );
        }

        if (toggledBackgroundColor && !currentStyle.has(toggledBackgroundColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledBackgroundColor
            );
        }

        this.workflow.close();

        onComplete(nextEditorState);
    }

    onClose(e) {
        e.preventDefault();
        const { onClose } = this.props;
        onClose();
    }

    render() {
        return null;
    }
}

window.draftail.registerPlugin({
    type: 'TEXTANDBACKGROUNDCOLOUR',
    source: CombinedColourSource,
});

