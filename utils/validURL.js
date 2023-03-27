function validURL(s) {
  try {
    let url = new URL(s);
    if (url && url.host == "www.youtube.com") {
      return true;
    }
  } catch (error) {
    console.error(chalk.red(error.message));
    return false;
  }
}

export default validURL;
