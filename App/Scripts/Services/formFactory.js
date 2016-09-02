'use strict';

var formFactory = {
  form: null,

  createForm: function(dataJSON, action, method) {
    formFactory.setFormAttributes(action, method);
    var sections = dataJSON.sections;
    var sectionsCount = sections.length;
    for (var i = 0; i < sectionsCount; i++) {
      var section = sections[i];
      formFactory.setSection(section);
    };
    return formFactory.form;
  },

  setFormAttributes: function(action, method) {
    formFactory.form = document.createElement("FORM");
    formFactory.form.setAttribute("action", action);
    formFactory.form.setAttribute("method", method);
  },

  setSection: function(section) {
    var title = formFactory.getTitle(section.description);
    formFactory.form.appendChild(title);

    var groupCount = section.fields.length;
    for (var f = 0; f < groupCount; f++) {
      var field = section.fields[f];
      formFactory.form.appendChild(formFactory.getInput(field));
    };
  },

  getInput: function(field) {
    if (field.type === "submit" || field.type === "button" || field.type === "reset") {
      var element = document.createElement("BUTTON");
      element.setAttribute("type", field.type);
      element.innerHTML = field.name;
      return element;

    } else {
      var element = document.createElement("INPUT");
      element.setAttribute("type", field.type);
      element.setAttribute("name", field.name);
      if (field.mandatory) {
        element.setAttribute("required", field.mandatory);
      };

      var container = formFactory.getContainer(field.name);
      if (field.type === "checkbox") {
        container.children[0].appendChild(element);
      } else {
        container.appendChild(element);
      };

      return container;
    };
  },

  getTitle: function(description) {
    var element = document.createElement("P");
    element.innerHTML = description;
    return element;
  },

  getContainer: function(name) {
    var container = document.createElement("DIV");
    container.setAttribute("data-form", "group");

    var label = document.createElement("LABEL");
    label.setAttribute("for", name);
    label.innerHTML = name + " ";

    container.appendChild(label);
    return container;
  },

  setLayout: function(form) {
    form.classList.add("form", "primary");
    formFactory.setStyleGroup(form.querySelectorAll('[data-form="group"]'));
    formFactory.setStyleButton(form.getElementsByTagName("button"));
  },

  setStyleButton: function(fields) {
    var fieldsCount = fields.length;
    for (var i = 0; i < fieldsCount; i++) {
      fields[i].classList.add("btn-info");
    };
  },

  setStyleGroup: function(fields) {
    var fieldsCount = fields.length;
    for (var i = 0; i < fieldsCount; i++) {
      fields[i].classList.add("group");
      if (fields[i].children.length > 1) {
        fields[i].children[1].classList.add("input-form-info");
      }
    };
  }
}
