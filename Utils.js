const hasSite = (customFields) => {
  let siteArr = {
    bool: false,
    value: null
  };
  customFields.forEach(row => {
    if(row.name == "SITE") {
     siteArr.bool = true;
     if(row.enum_value != null) {
       siteArr.value = row.enum_value.name;
     }
    }
  });

  return siteArr;
}
