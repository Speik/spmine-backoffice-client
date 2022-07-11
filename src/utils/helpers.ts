const replaceRouteParams = (
  route: string,
  params: { [key: string]: string },
) => {
  const PARAM_SIGNATURE = ':';
  const urlParts = route.split('/');

  const handledParts = urlParts.map((segment) => {
    if (!segment.startsWith(PARAM_SIGNATURE)) {
      return segment;
    }

    // Not typo. Here we need just second element - value
    const [, targetValue] = Object.entries(params).find((entry) => {
      const [key] = entry;
      const paramWithSignature = PARAM_SIGNATURE + key;

      if (paramWithSignature === segment) {
        return true;
      }

      return false;
    }) as [string, string];

    return targetValue ? targetValue : segment;
  });

  return handledParts.join('/');
};

export { replaceRouteParams };
