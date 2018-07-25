import LocalizedStrings from 'react-native-localization';
// https://github.com/stefalda/ReactNativeLocalization/wiki

export function getLocalizedText(localText, text) {
  const localizedText =
    strings.getLanguage().trim() === 'wa' ? localText : text;
  return localizedText;
}

export const strings = new LocalizedStrings({
  'en-US': {
    view_schools_title: 'VIEW SCHOOLS',
    view_schools_subtitle: 'Tap to view schools',
    view_guidelines_title: 'VIEW GUIDELINES',
    view_guidelines_subtitle: 'Tap to view construction guidelines',

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
      view_schools_title: 'Kitaon it eskwelahan',
      view_schools_subtitle: 'Pindota para makita an eskwelaha dinhi ha proyekto',
      view_guidelines_title: 'Kitaa an mga pamaagi',
      view_guidelines_subtitle: 'Pindota para maka kita an mga paagi han sakto na konstruksyon',

      action_search_here: 'Pag biling',
      title_schools: 'Mga eskwelahan',
      action_setting: 'Settings',

      title_steps: 'Mga Pama-agi',
      title_checklist: 'Listahan',

      title_guideline_categories: 'Guideline Categories',
      title_guideline_details: 'Mga pamaagi',
      view_good_photo_title: 'Maupay nga Litrato',
      view_bad_photo_title: 'Diri Maupay nga Litrato',
      view_tap_to_open: 'Pindota para umabri',

      text_contains_steps: 'Mayda na pamaagi',
      action_report: 'Report',

      event_upload_sucess_title: 'Manilampuson nga pagupload',
      event_upload_sucess_text: 'Nakarawat na an imo report',

      event_upload_failed_title: 'Waray ka upload',
      event_no_intenet_text: 'Kitaa it imo internet koneksyon ngan utroha',

      action_close: 'Pag-sara',
      action_cancel: 'Pag kansela',

      view_take_photo: 'Kumuha hin litrato',
      view_upload_reprot: 'Report',
      view_comments: 'comments',

      error_field_cannot_be_empty: 'This field cannot be empty'
  }
});
