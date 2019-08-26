function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

export function escapeMarkdownChars(text: string): string {
  let result = text;

  // First replace all backslashes because we are adding backslashes in this function
  result = result.replace(/([\\])/gi, "\\$1");

  // Periods only happen in ordered lists
  result = result.replace(/^(\s*\w+)\./gi, "$1\\.");

  // Hashtags shouldn't be escaped, but elsewhere should
  result = result.replace(/(#\s)/gi, "\\$1");
  
  // Check if the result is a URL, if so then return here so we don't overescape
  if (isURL(result)) {
    return result;
  }

  // Catch all escaping for certain characters
  // TODO: situationally escape these characters so we don't overescape
  return result.replace(/([`*{}\[\]()+\-!|_>])/gi, "\\$1");
}
