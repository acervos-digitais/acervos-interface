class CollectionFilter extends Filter {
  constructor(data, menuId, itemsId) {
    super(data, menuId, itemsId);

    for (const col of Object.keys(data)) {
      const labelSlug = col.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, col, col);
    }
  }

  filter(inputIds) {
    // TODO: filter based on checkboxes
  }
}
