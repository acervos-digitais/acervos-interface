class CategoryFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (const cat of Object.keys(data)) {
      const labelSlug = cat.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, cat, cat);
    }
  }

  filter(inputIds) {
    // TODO: filter based on checkboxes
  }
}
