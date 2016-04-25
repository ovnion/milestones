!function(a,b,c,d){"use strict";function e(b,c){var d,e=a.Deferred();try{d=JSON.parse(localStorage.getItem(b))}catch(f){}return d&&c?c?e.notify(d):e.resolve(d):c||e.reject(),c().done(function(a){try{localStorage.setItem(b,JSON.stringify(a))}catch(c){}}).done(function(a){e.resolve(a)}),e.promise()}function f(a){var b=[],c={};a.forEach(function(a){a.assignee&&(c[a.assignee.login]=a.assignee)}),a=a.filter(function(a){return!!a.milestone}),b=a.reduce(function(a,b){var c,d,e=b.milestone;return c=a.map(function(a){return a.id}),d=c.indexOf(e.id),delete b.milestone,-1===d?(e.issues=[b],a.push(e)):(e=a[d],e.issues.push(b)),a},[]),b=b.filter(function(a){return"closed"!==a.state}),a=a.map(function(a){return a.state=j(a),a.effort=k(a),a.subtasks=l(a),a}),b=b.map(function(a){var b,d=7;return a.effort=a.issues.reduce(function(a,b){return a.total+=b.effort||d,void 0===b.effort?a.unrated+=d:a[b.state]+=b.effort,a},{total:0,closed:0,active:0,open:0,unrated:0}),a.state=a.open_issues>0?a.issues.reduce(function(a,b){return"closed"===a||"closed"===b.state?"active":"active"===a||"active"===b.state?"active":a},"open"):"closed",b=a.description.split(/\s+-{3,}\s+/),a.nr=parseInt(a.title),a.title=a.title.replace(/^\d+\s+/,""),a.assignee=c[b[0].substr(7)],a.description=b[1],a.issues.sort(m),a}),b.sort(n),g(b),h(b)}function g(b){var d,e,f=0;b=b.map(function(a){return a.total=a.effort.total,a.closedPercent=parseInt(a.effort.closed/a.total*100,10),a.activePercent=parseInt(a.effort.active/a.total*100,10),a.unratedPercent=parseInt(a.effort.unrated/a.total*100,10),a.openPercent=parseInt(a.effort.open/a.total*100,10),a}),d=b.reduce(function(a,b){return a+b.total},0),e=b.map(function(a){return a.total=a.total/d*100,f+=a.total,c.template(u,c.extend({},a,{preceding:f-a.total}))}).join("\n"),e='<div class="progress">'+e+"</div>",a(".chart").html(e);var g="",h="",i=[],j=[];f=0,b.forEach(function(a){f+=a.total,f>50?j.push(a):i.push(a)}),f=0,i.forEach(function(a){g+='<div class="milestone-label" style="margin-left: '+a.total/(100-f)*100+'%;">',g+="<span>",g+=a.title,g+="</span>",f+=a.total}),i.forEach(function(){g+="</div>"}),f=0,j.reverse(),j.forEach(function(a,b){var c=b>0?j[b-1].total:0;h+='<div class="milestone-label" style="margin-right: '+c/(100-f+c)*100+'%;">',f+=a.total}),j.reverse().forEach(function(a){h+="<span>",h+=a.title,h+="</span>",h+="</div>"}),a(".chart").prepend('<div class="top-labels">'+g+"</div>"),a(".chart").append('<div class="bottom-labels">'+h+"</div>");var k="",l=b.reduce(function(a,b){return a.closed+=b.effort.closed,a.active+=b.effort.active,a.unrated+=b.effort.unrated,a.open+=b.effort.open,a.total+=b.effort.total,a.issues+=b.issues.length,a},{closed:0,active:0,unrated:0,open:0,total:0,issues:0});l.milestones=b.length,k+='<div class="summary">\n',k+="  <strong>"+l.milestones+"</strong> milestones,\n",k+="  <strong>"+l.issues+"</strong> tasks,\n",k+="  <strong>"+l.total+"</strong> total effort.<br>\n",k+="  <strong>"+parseInt(l.closed/l.total*100,10)+"%</strong> done,\n",k+="  <strong>"+parseInt(l.active/l.total*100,10)+"%</strong> active,\n",k+="  <strong>"+parseInt(l.open/l.total*100,10)+"%</strong> open.\n",k+="  <strong>"+l.unrated/7+"</strong> unrated tasks.\n",k+="</div>\n",a(".chart").append(k)}function h(b){var d=[];b.forEach(function(a){var b=a.issues.map(function(b,d,e){return c.template(t,c.extend(b,{isNewMilestone:0===d,numMilestoneIssues:e.length,milestoneTitle:a.title,milestoneDescription:a.description,milestoneAssignee:a.assignee,markdownToHTML:p}))});d=d.concat(b)}),a("tbody").html(d.join("\n"))}function i(a){window.console.log(a)}function j(a){var b,c;return b=a.state,c=1===a.labels.filter(function(a){return"active"===a.name}).length,c&&(b="active"),b}function k(a){var b;return b=a.labels.reduce(function(a,b){var c=parseInt(b.name,10);return"number"!=typeof c?a:c>a?c:a},0),b||void 0}function l(a){var b,c,d,e=a.body||"";return b=(e.match(/(^|\n)- \[\s+\]/g)||[]).length,c=(e.match(/(^|\n)- \[x]/gi)||[]).length,d=b+c,c!==d?{open:b,closed:c}:void 0}function m(a,b){return v[a.state]<v[b.state]?1:v[a.state]>v[b.state]?-1:a.update_at<b.update_at?1:a.update_at>b.update_at?-1:0}function n(a,b){return a.nr>b.nr?1:a.nr<b.nr?-1:0}function o(b){var c=a(b.currentTarget);a(b.tarket).is("a")||c.toggleClass("showDescription")}function p(a){var b=markdown.toHTML(a||"");return b=b.replace(/<li>\[\s+\]/g,'<li class="sub-task"><input type="checkbox" disabled>'),b=b.replace(/<li>\[x\]/gi,'<li class="sub-task"><input type="checkbox" checked disabled>'),b=b.replace(/(https:\/\/github.com\/)?(\w+)\/([^#\/\s\n]+)\/issues\/(\d+)/g," $2/$3#$4"),b=b.replace(/(https?:\/\/[^\s\n<]+)/g,'<a href="$1">$1</a>'),b=b.replace(/ (\w+)\/([^#]+)#(\d+)/g,' <a href="https://github.com/$1/$2/issues/$3">$1/$2#$3</a>')}var q="https://github.com/ovnion/Manual-De-Equipo",r=q.match(/github.com\/([^\/]+)/).pop(),s=q.match(/github.com\/[^\/]+\/([^\/]+)/).pop(),t="";t+='<tr class="<%= isNewMilestone ? "newMilestone" : "" %>">\n',t+="    <% if (isNewMilestone) { %>\n",t+='    <th class="milestone" rowspan="<%= numMilestoneIssues %>">\n',t+="        <% if (milestoneAssignee) { %>\n",t+='        <div class="pull-right">\n',t+='          <a href="<%= milestoneAssignee.html_url %>">\n',t+='              <img src="<%= milestoneAssignee.avatar_url %>&s=24" alt="<%= milestoneAssignee.login %>">\n',t+="          </a>\n",t+="        </div>\n",t+="        <% } %>\n",t+="        <strong><%= milestoneTitle %></strong>\n",t+="        <small><%= markdownToHTML(milestoneDescription) %></small>\n",t+="    </th>\n",t+="    <% } %>\n",t+='    <td class="task" data-nr="<%= number %>">\n',t+='        <div class="pull-right">\n',t+='          <% if (assignee && state === "active") { %>\n',t+='          <a href="<%= assignee.html_url %>">\n',t+='              <img src="<%= assignee.avatar_url %>&s=24" alt="<%= assignee.login %>">\n',t+="          </a>\n",t+="          <% } %>\n",t+="          <% if (effort === undefined) { %>\n",t+='          <span class="label label-danger">unrated</span>\n',t+="          <% } else {%>\n",t+='          <div title="effort: <%= effort %>" class="progress" style="width: <%= effort * 2 %>0px">\n',t+='            <% if (state !== "open") { %>\n',t+='            <div class="progress-bar <%= state === "active" ? "progress-bar-striped active" : "" %>"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>\n',t+="            <% } %>\n",t+="          </div>\n",t+="          <% } %>\n",t+="        </div>\n",t+="        <strong>\n",t+="            <%= title %>\n",t+="            <% if (subtasks) { %>\n",t+="            (<%= subtasks.closed %>/<%= subtasks.open + subtasks.closed %>)\n",t+="            <% } %>\n",t+='            <a href="<%= html_url %>">\n',t+="              #<%= number %>\n",t+="            </a>\n",t+="        </strong>\n",t+="        <small>\n",t+="          <%= markdownToHTML(body) %>\n",t+='          <a class="btn btn-default btn-xs" href="<%= html_url %>">\n',t+="            open on GitHub\n",t+="          </a>\n",t+="        </small>\n",t+="    </td>\n",t+="</tr>";var u="";u+='<div title="<%= total %>" class="progress-group <% if (preceding > 50) { %>over50percent<% } %>" style="width: <%= total %>%;">',u+='  <div class="progress-bar" style="width: <%= closedPercent %>%"></div>',u+='  <div class="progress-bar progress-bar-striped active" style="width: <%= activePercent %>%"></div>',u+='  <div class="progress-bar progress-bar-danger" style="width: <%= unratedPercent %>%"></div>',u+='  <div class="progress-bar invisible" style="width: <%= openPercent %>%;"></div>',u+='  <div class="progress-group-label"><%= title %></div>',u+="</div>";var v={open:0,active:1,closed:2};window.onerror=function(){try{localStorage.clear()}catch(a){}},e("issues",d.user(r).repo(s).issues.findAll).progress(f).done(f).fail(i),a(document.body).on("click","th.milestone, td.task",o)}(jQuery,initials,_,githubApi,markdown);
