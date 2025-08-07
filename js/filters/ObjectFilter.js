class ObjectFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (const obj of Object.keys(data)) {
      const labelSlug = obj.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, obj, obj);
    }
  }

  filter(inputIds) {
    // TODO: filter based on checkboxes
  }
}
