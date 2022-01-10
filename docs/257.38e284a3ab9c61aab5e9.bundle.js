"use strict";(self.webpackChunkKuiClientTemplate=self.webpackChunkKuiClientTemplate||[]).push([[257],{20257:(e,t,s)=>{s.r(t),s.d(t,{plugin:()=>u});var i=s(11227),n=s.n(i),o=s(18495),h=function(e,t,s,i){return new(s||(s=Promise))((function(n,o){function h(e){try{c(i.next(e))}catch(e){o(e)}}function l(e){try{c(i.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(h,l)}c((i=i.apply(e,t||[])).next())}))};const l=(0,o.i18n)("plugin-core-support"),c=n()("plugins/core-support/theme"),m={theme:{command:"theme",strict:"theme",docs:l("theme.usageDocs")},themes:{command:"themes",strict:"themes",docs:l("theme.usageDocs")},list:{command:"list",strict:"list",docs:l("theme.usageDocs")},reset:{command:"reset",strict:"reset",docs:l("theme.resetUsageDocs")},set:{command:"set",strict:"set",docs:"Set the current theme",required:[{name:"string",docs:l("theme.setUsageRequiredDocs")}]}},d=({REPL:e})=>h(void 0,void 0,void 0,(function*(){const t={cells:[l("Theme"),{value:l("Style"),hints:"hide-with-narrow-window"},{value:l("Provider"),hints:"hide"}]},s=()=>h(void 0,void 0,void 0,(function*(){const e=(yield o.Themes.getPersistedThemeChoice())||(yield o.Themes.getDefaultTheme());return o.Themes.findThemeByName(e)?e:o.Themes.getDefaultTheme()}));c("currentTheme",yield s());const i=o.Util.flatten((yield o.Settings.uiThemes()).map((({plugin:t,themes:s})=>s.map((s=>({nameIdx:0,cells:[{value:s.name},{value:l(s.style),hints:"hide-with-narrow-window"},{value:t,hints:["hide"]}],onSelectExec:"qexec",onSelect:`theme set ${e.encodeComponent(s.name)}`})))))).sort(((e,t)=>"plugin-core-themes"===e.cells[2].value?1:"plugin-core-themes"===t.cells[2].value?-1:0)),n=yield h(void 0,void 0,void 0,(function*(){const e=yield s();return i.findIndex((t=>t.cells[0].value===e))}));return{apiVersion:"kui-shell/v1",kind:"RadioTable",title:l("theme.Available Themes"),header:t,body:i,defaultSelectedIdx:n}})),r=({argvNoOptions:e})=>h(void 0,void 0,void 0,(function*(){const t=e[e.indexOf("set")+1];return c("set",t),yield o.Themes.switchToTheme(t),!0})),u=e=>{c("plugin"),e.listen("/theme/list",d,{usage:m.list}),e.listen("/themes",d,{usage:m.themes}),e.listen("/theme",d,{usage:m.theme}),e.listen("/theme/set",r,{usage:m.set}),e.listen("/theme/current",(()=>h(void 0,void 0,void 0,(function*(){return(yield o.Themes.getPersistedThemeChoice())||l("theme.currentTheme")}))),{hidden:!0}),e.listen("/theme/reset",o.Themes.resetToDefaultTheme,{usage:m.reset})}}}]);