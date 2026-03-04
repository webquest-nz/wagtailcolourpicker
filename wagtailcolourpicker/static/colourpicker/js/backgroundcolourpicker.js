var React = window.React;
var EditorState = window.DraftJS.EditorState;
var Modifier = window.DraftJS.Modifier;
var RichUtils = window.DraftJS.RichUtils;

class BackgroundColourSource extends React.Component {

    constructor(props) {
        super(props);

        this.onChosen = this.onChosen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        $(document.body).on('hidden.bs.modal', this.onClose);

        this.workflow = ModalWorkflow({
            url: window.chooserUrls.backgroundColourChooser,
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

    onChosen(toggledColor, featuredColors) {
        const { editorState, onComplete } = this.props;
        const selection = editorState.getSelection();

        const nextContentState = featuredColors
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());

        var nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
              return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        if (toggledColor && !currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
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
    type: 'BACKGROUNDCOLOUR',
    source: BackgroundColourSource,
});

