frappe.provide('frappe.ui.misc');
frappe.ui.misc.about = function() {
	if(!frappe.ui.misc.about_dialog) {
		var d = new frappe.ui.Dialog({title: __('Revalue Framework')});

		$(d.body).html(repl("<div>\
		<p>"+__("ERP System On Cloud & On Premises")+"</p>  \
		<p><i class='fa fa-globe fa-fw'></i>\
			Website: <a href='http://www.revaluesoft.com' target='_blank'>http://www.revaluesoft.com</a></p>\
		<p><i class='fa fa-github fa-fw'></i>\
			Source: <a href='http://www.revaluesoft.com' target='_blank'>http://www.revaluesoft.com</a></p>\
		<hr>\
		<p class='text-muted'>&copy; 2016 Revalue Soft S.A.E</p> \
		</div>", frappe.app));

		frappe.ui.misc.about_dialog = d;

		frappe.ui.misc.about_dialog.on_page_show = function() {
			if(!frappe.versions) {
				frappe.call({
					method: "frappe.utils.change_log.get_versions",
					callback: function(r) {
						show_versions(r.message);
					}
				})
			}
		};

		var show_versions = function(versions) {
			var $wrap = $("#about-app-versions").empty();
			$.each(Object.keys(versions).sort(), function(i, key) {
				var v = versions[key];
				if(v.branch) {
					var text = $.format('<p><b>{0}:</b> v{1} ({2})<br></p>',
						[v.title, v.branch_version || v.version, v.branch])
				} else {
					var text = $.format('<p><b>{0}:</b> v{1}<br></p>',
						[v.title, v.version])
				}
				$(text).appendTo($wrap);
			});

			frappe.versions = versions;
		}

	}

	frappe.ui.misc.about_dialog.show();

}
