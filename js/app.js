!function(a,b,c,d){"use strict";function e(b,c){var d,e=a.Deferred();try{d=JSON.parse(localStorage.getItem(b))}catch(f){}return d&&c?c?e.notify(d):e.resolve(d):c||e.reject(),c().done(function(a){try{localStorage.setItem(b,JSON.stringify(a))}catch(c){}}).done(function(a){e.resolve(a)}),e.promise()}function f(a){var b=[],c={};a.forEach(function(a){a.assignee&&(c[a.assignee.login]=a.assignee)}),a=a.filter(function(a){return!!a.milestone}),b=a.reduce(function(a,b){var c,d,e=b.milestone;return c=a.map(function(a){return a.id}),d=c.indexOf(e.id),delete b.milestone,-1===d?(e.issues=[b],a.push(e)):(e=a[d],e.issues.push(b)),a},[]),a=a.map(function(a){return a.state=j(a),a.effort=k(a),a}),b=b.map(function(a){var b;return a.effort=a.issues.reduce(function(a,b){return a.total+=b.effort,a[b.state]+=b.effort,a},{total:0,closed:0,active:0,open:0}),a.state=a.open_issues>0?a.issues.reduce(function(a,b){return"closed"===a||"closed"===b.state?"active":"active"===a||"active"===b.state?"active":a},"open"):"closed",b=a.description.split(/\s+-{3,}\s+/),a.assignee=c[b[0].substr(7)],a.description=b[1],a.issues.sort(l),a}),b.sort(m),g(b),h(b)}function g(b){var d,e,f=0;b=b.map(function(a){return a.total=a.effort.total,a.closedPercent=parseInt(a.effort.closed/a.total*100,10),a.activePercent=parseInt(a.effort.active/a.total*100,10),a}),d=b.reduce(function(a,b){return a+b.total},0),e=b.map(function(a){return a.total=a.total/d*100,f+=a.total,c.template(s,c.extend({},a,{preceding:f-a.total}))}).join("\n"),a(".chart").html(e)}function h(b){var d=[];b.forEach(function(a){var b=a.issues.map(function(b,d,e){return c.template(r,c.extend(b,{isNewMilestone:0===d,numMilestoneIssues:e.length,milestoneTitle:a.title.replace(/^\d+\s+/,""),milestoneDescription:a.description,milestoneAssignee:a.assignee}))});d=d.concat(b)}),a("tbody").html(d.join("\n"))}function i(a){window.console.log(a)}function j(a){var b,c;return b=a.state,c=1===a.labels.filter(function(a){return"active"===a.name}).length,c&&(b="active"),b}function k(a){var b,c=7;return b=a.labels.reduce(function(a,b){var d=parseInt(b.name,10);return/^5\+/.test(b.name)&&(a=c),"number"!=typeof d?a:d>a?d:a},0),b||c}function l(a,b){return t[a.state]<t[b.state]?1:t[a.state]>t[b.state]?-1:a.update_at<b.update_at?1:a.update_at>b.update_at?-1:0}function m(a,b){return a.title>b.title?1:a.title<b.title?-1:0}function n(b){var c=a(b.currentTarget);c.toggleClass("showDescription")}var o="https://github.com/gr2m/milestones",p=o.match(/github.com\/([^\/]+)/).pop(),q=o.match(/github.com\/[^\/]+\/([^\/]+)/).pop(),r="";r+='<tr class="<%= isNewMilestone ? "newMilestone" : "" %>">\n',r+="    <% if (isNewMilestone) { %>\n",r+='    <th class="milestone" rowspan="<%= numMilestoneIssues %>">\n',r+="        <% if (milestoneAssignee) { %>\n",r+='        <div class="pull-right">\n',r+='          <a href="<%= milestoneAssignee.html_url %>">\n',r+='              <img src="<%= milestoneAssignee.avatar_url %>s=24" alt="<%= milestoneAssignee.login %>">\n',r+="          </a>\n",r+="        </div>\n",r+="        <% } %>\n",r+="        <strong><%= milestoneTitle %></strong>\n",r+='        <small><%= markdown.toHTML(milestoneDescription || "") %></small>\n',r+="    </th>\n",r+="    <% } %>\n",r+='    <td class="task" data-nr="<%= number %>">\n',r+='        <div class="pull-right">\n',r+="          <% if (assignee) { %>\n",r+='          <a href="<%= assignee.html_url %>">\n',r+='              <img src="<%= assignee.avatar_url %>s=24" alt="<%= assignee.login %>">\n',r+="          </a>\n",r+="          <% } %>\n",r+='          <div title="<%= effort %>" class="progress <%= effort > 5 ? "unratable" : "" %>" style="width: <%= effort * 2 %>0px">\n',r+='            <% if (state !== "open") { %>\n',r+='            <div class="progress-bar <%= state === "active" ? "progress-bar-striped active" : "" %>"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>\n',r+="            <% } %>\n",r+="          </div>\n",r+="        </div>\n",r+="        <strong>\n",r+="            <%= title %>\n",r+='            <a href="<%= html_url %>">\n',r+="              #<%= number %>\n",r+="            </a>\n",r+="        </strong>\n",r+="        <small>\n",r+='          <%= markdown.toHTML(body || "") %>\n',r+='          <a class="btn btn-default btn-xs" href="<%= html_url %>">\n',r+="            open on GitHub\n",r+="          </a>\n",r+="        </small>\n",r+="    </td>\n",r+="</tr>";var s="";s+='<div class="progress-container" style="width: <%= total %>%; left: <%= preceding %>%;">',s+='  <div class="progress">',s+='    <div class="progress-bar" style="width: <%= closedPercent %>%"></div>',s+='    <div class="progress-bar progress-bar-striped active" style="width: <%= activePercent %>%"></div>',s+="  </div>",s+="</div>";var t={open:0,active:1,closed:2};window.onerror=function(){try{localStorage.clear()}catch(a){}},e("issues",d.user(p).repo(q).issues.findAll).progress(f).done(f).fail(i),a(document.body).on("click touchstart","th.milestone, td.task",n)}(jQuery,initials,_,githubApi);