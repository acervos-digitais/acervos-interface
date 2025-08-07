class CollectionFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (const col of Object.keys(data)) {
      const labelSlug = col.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, col, col);
    }
  }

  filter(inputIds) {
    // TODO: filter based on checkboxes
  }
}
