window.Demo = window.Demo || {};
window.Demo.Services = window.Demo.Services || {};

Demo.Services.ProductsService = function () {
  function getCategories() {
    var url = String.format(
      "{0}/_api/Web/Lists/GetByTitle('Categories')/Items?$orderby=Title",
      _spPageContextInfo.webAbsoluteUrl);
      
    return restApiGet(url);
  }

  function getProductsByCategory(categoryId) {
    var url = String.format(
      "{0}/_api/Web/Lists/GetByTitle('Products')/Items?" +
      "$filter=CategoryId eq {1}&" +
      "$orderby=Title",
      _spPageContextInfo.webAbsoluteUrl, categoryId);

    return restApiGet(url);
  }

  function restApiGet(url, odataFormat) {
    if (!odataFormat) odataFormat = "minimalmetadata";

    var call = jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      cache: false,
      headers: {
        Accept: "application/json;odata=" + odataFormat
      }
    });

    return call;
  }		

  return {
    getCategories: getCategories,
    getProductsByCategory: getProductsByCategory
  }

}