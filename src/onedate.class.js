const OneDate = function OneDate(config, helper) {
  let year;
  let month;
  let day;
  let adapterId;
  let adapter;
  let primaryAdapter;
  let primaryAdapterId;

  const construct = () => {
    year = config.year;
    month = config.month;
    day = config.day;
    adapterId = config.adapterId || helper.primaryAdapterId;
    adapter = helper.getAdapter(adapterId);
    primaryAdapterId = helper.primaryAdapterId;
    primaryAdapter = helper.getAdapter(primaryAdapterId);
  };
  construct();

  const localToPrimary = (date) => {
    const i18nDate = adapter.i18n(date);
    const l10nDate = primaryAdapter.l10n(i18nDate);
    return l10nDate;
  };

  const int = () => {
    const date = localToPrimary({ year, month, day });
    return parseInt(`${date.year.slice(-4)}${date.month.slice(-2)}${date.day.slice(-2)}`, 10);
  };

  return { year, month, day, adapterId, int };
};

exports.OneDate = OneDate;