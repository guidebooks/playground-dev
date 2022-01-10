"use strict";(self.webpackChunkKuiClientTemplate=self.webpackChunkKuiClientTemplate||[]).push([[5966,617,4634],{4634:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c,ReactCommentary:()=>u});var i=s(67294),n=s(17187),a=s(18495),o=s(30617),r=s(18812),l=s(23653);const h=i.lazy((()=>Promise.all([s.e(8575),s.e(3320),s.e(5608),s.e(6502),s.e(7773),s.e(8247)]).then(s.bind(s,47773)))),d=i.lazy((()=>Promise.all([s.e(176),s.e(9747),s.e(8544)]).then(s.bind(s,6487)))),p=(0,a.i18n)("plugin-client-common");class c extends i.PureComponent{constructor(e){super(e),this.cleaners=[],this.onGet=e=>e(this.state.textValue),this.onEdit=e=>this.setState({textValue:e}),this._onCancel=this.onCancel.bind(this),this._onRevert=this.onRevert.bind(this),this._onDone=this.onDone.bind(this),this._setEdit=this.setEdit.bind(this),this._onContentChange=this.onContentChange.bind(this),this._onSaveFromEditor=this.onSaveFromEditor.bind(this),this._onCancelFromEditor=this.onCancelFromEditor.bind(this);const t=this.initialTextValue();this.state={isEdit:!1!==e.edit&&(e.edit||0===t.length),textValue:t,lastAppliedTextValue:t},this.initCouplingEvents()}componentWillUnmount(){this.cleaners.forEach((e=>e())),this.props.send&&c.events.emit(this.editChannel,"")}componentDidUpdate(){this.props.send&&c.events.emit(this.editChannel,this.state.textValue)}get getChannel(){return`/get/${this.props.receive||this.props.send}`}get editChannel(){return`/edit/${this.props.receive||this.props.send}`}get isCoupled(){return this.props.send||this.props.receive}initCouplingEvents(){this.props.receive?(c.events.on(this.editChannel,this.onEdit),this.cleaners.push((()=>c.events.off(this.editChannel,this.onEdit))),setTimeout((()=>c.events.emit(this.getChannel,this.onEdit)))):this.props.send&&(c.events.on(this.getChannel,this.onGet),this.cleaners.push((()=>c.events.off(this.getChannel,this.onGet))),setTimeout((()=>c.events.emit(this.editChannel,this.state.textValue))))}onCancel(e){this.onRevert(e,!1),this.removeOurselvesIfEmpty()}cancel(){return i.createElement(r.default,{kind:"secondary",size:"small",className:"kui--tab-navigatable kui--commentary-button kui--commentary-cancel-button",onClick:this._onCancel},p("Cancel"))}onRevert(e,t=!0){e&&e.stopPropagation(),this.setState((e=>{const s=e.lastAppliedTextValue;return this.props.willUpdateResponse&&this.props.willUpdateResponse(s),{isEdit:t,textValue:s}}))}revert(){return i.createElement(r.default,{kind:"tertiary",size:"small",className:"kui--tab-navigatable kui--commentary-button kui--commentary-revert-button",onClick:this._onRevert},p("Revert"))}removeOurselvesIfEmpty(){return""===this.state.textValue&&(this.props.willRemove&&this.props.willRemove(),!0)}onDone(e){e&&e.stopPropagation(),this.removeOurselvesIfEmpty()||this.setState((e=>(this.props.willUpdateCommand(`# ${e.textValue.replace(/\n/g,"\\n").replace(/\t/g,"\\t")}`),{isEdit:!1,lastAppliedTextValue:e.textValue})))}done(){return i.createElement(r.default,{size:"small",className:"kui--tab-navigatable kui--commentary-button kui--commentary-done-button",onClick:this._onDone},p("Done"))}toolbar(){return i.createElement("div",{className:"kui--commentary-editor-toolbar fill-container flush-right"},this.done()," ",this.cancel()," ",this.revert())}setEdit(){this.setState({isEdit:!0})}preview(){if(!1!==this.props.preview)return i.createElement(h,{nested:!0,execUUID:this.props.execUUID,filepath:this.props.filepath,source:this.state.textValue,codeBlockResponses:this.props.codeBlockResponses,baseUrl:this.props.baseUrl,tab:this.props.tab})}card(){return i.createElement(l.ME.Consumer,null,(e=>i.createElement("span",{className:"kui--commentary-card",onDoubleClick:e.editable?this._setEdit:void 0},i.createElement(o.default,Object.assign({},this.props,{"data-is-editing":this.state.isEdit||void 0,header:this.state.isEdit&&!1!==this.props.header&&p("Editing Comment as Markdown"),footer:this.state.isEdit&&!this.isCoupled&&this.toolbar()}),this.preview(),this.state.isEdit&&this.editor()))))}onContentChange(e){this.setState({textValue:e}),this.props.willUpdateResponse&&this.props.willUpdateResponse(this.state.textValue)}onSaveFromEditor(e){this.onContentChange(e),this.onDone()}onCancelFromEditor(){this.onCancel()}initialTextValue(){return this.props.children||""}editor(){return i.createElement(i.Suspense,{fallback:i.createElement("div",null)},i.createElement(d,{tabUUID:this.props.tab.uuid,content:this.state.textValue,className:"kui--source-ref-editor kui--commentary-editor",readonly:!1,simple:!0,wordWrap:"on",onSave:this._onSaveFromEditor,onCancel:this._onCancelFromEditor,onContentChange:this._onContentChange,contentType:"markdown",scrollIntoView:!1}))}render(){return this.props.onRender(),i.createElement("div",{className:"kui--commentary","data-is-editing":this.state.isEdit||void 0,"data-no-header":!1===this.props.header||void 0},this.card())}}c.events=new n.EventEmitter;class u extends i.PureComponent{render(){return i.createElement("div",{className:"kui--commentary"},i.createElement("span",{className:"kui--commentary-card"},i.createElement(o.default,null,this.props.children)))}}},30617:(e,t,s)=>{s.r(t),s.d(t,{default:()=>a});var i=s(67294);const n=i.lazy((()=>Promise.all([s.e(3676),s.e(3749),s.e(237),s.e(6066)]).then(s.bind(s,6066))));function a(e){return i.createElement(i.Suspense,{fallback:i.createElement("div",null)},i.createElement(n,Object.assign({},e)))}}}]);