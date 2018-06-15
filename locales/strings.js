import LocalizedStrings from 'react-native-localization';
// https://github.com/stefalda/ReactNativeLocalization/wiki

export function getLocalizedText(localText, text) {
  const localizedText =
    strings.getLanguage().trim() === 'wa' ? localText : text;
  return localizedText;
}

export const strings = new LocalizedStrings({
  'en-US': {
    view_schools_title: 'View Schools',
    view_schools_subtitle: 'Tap to see schools in this project',
    view_guidelines_title: 'View Guidelines',
    view_guidelines_subtitle: 'Tap to explore safe construction guidelines',

    action_search_here: 'Search here',
    title_schools: 'Schools',
    action_setting: 'Setting',

    title_steps: 'steps',
    title_checklist: 'Checklist',

    title_guideline_categories: 'Guideline Categories',
    title_guideline_details: 'Guidelines',
    view_good_photo_title: 'Good Photo',
    view_bad_photo_title: 'Bad Photo',
    view_tap_to_open: 'Tap to open',

    text_contains_steps: 'Contains steps',
    action_report: 'Report',

    event_upload_sucess_title: 'Uploaded Sucess',
    event_upload_sucess_text: 'Your report has been recorded.',

    event_upload_failed_title: 'Uploaded Failed',
    event_no_intenet_text: 'Check your internet connection and try again',

    action_close: 'Close',
    action_cancel: 'cancel',

    view_take_photo: 'Take a photo',
    view_upload_reprot: 'Report',
    view_comments: 'comments',

    error_field_cannot_be_empty: 'This field cannot be empty'
  },
  en: {
    view_schools_title: 'View Schools',
    view_schools_subtitle: 'Tap to see schools in this project',
    view_guidelines_title: 'View Guidelines',
    view_guidelines_subtitle: 'Tap to explore safe construction guidelines'
  },
  wa: {
    view_schools_title: 'विद्यालयहरू हेर्नुहोस्',
    view_schools_subtitle: 'यो परियोजनामा विद्यालयहरू हेर्न ट्याप गर्नुहोस्',
    view_guidelines_title: 'दिशानिर्देशहरू हेर्नुहोस्',
    view_guidelines_subtitle:
      'सुरक्षित निर्माण निर्देशनहरू पत्ता लगाउन ट्याप गर्नुहोस्'
  }
});
