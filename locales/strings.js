import LocalizedStrings from 'react-native-localization';
// https://github.com/stefalda/ReactNativeLocalization/wiki

export function getLocalizedText(localText, text) {
  if (localText !== null) {
    const localizedText =
      strings.getLanguage().trim() === 'wa' ? localText : text;
    return localizedText;
  }
  return text;
}

export const strings = new LocalizedStrings({
  'en-US': {
    view_select_header: 'What do you want to do today?',
    view_schools_title: 'SCHOOLS',
    view_schools_subtitle: 'Tap here to see your schools',
    view_guidelines_title: 'HOUSES AND CONSTRUCTION ',
    view_guidelines_subtitle: 'Tap here to learn more about houses and general construciton',
    view_select2_header: 'What do you want to do today?',
    view_select2_title1: 'I want to know',
    view_select2_title2: 'I want to know how to',
    view_select2_subtitle1: 'More About Materials',
    view_select2_subtitle2: 'Build a House',
    view_select3_header: 'What do you want to do today?',
    view_select3_title1: 'What makes',
    view_select3_title2: 'What are the',
    view_select3_subtitle1: 'My House Strong?',
    view_select3_subtitle2: 'Key Parts of a House?',
    action_search_here: 'Search here',
    title_schools: 'Schools',
    action_setting: 'Setting',

    title_steps: 'CLICK ON THE STAGE TO LEARN MORE',
    title_checklist: 'Checklist',

    title_guideline_categories: 'Construction Materials',
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
    action_cancel: 'Cancel',

    view_take_photo: 'Take a photo',
    view_upload_reprot: 'Report',
    view_comments: 'comments',

    error_field_cannot_be_empty: 'This field cannot be empty...'
  },
  'wa': {
    view_select_header: 'ANO IMO KARUYAG HIMUON YANA NA ADLAW?',
      view_schools_title: 'KITAON AN AMON ESKWELAHAN',
      view_schools_subtitle: ' ',
      view_guidelines_title: 'MAKA SABOT PARTE HIT BALAY NGAN PAG AYAD',
      view_guidelines_subtitle: ' ',
      view_select2_header: 'What do you want to do today?',
      view_select2_title1: 'KARUYAG KO MABARUAN',
      view_select2_title2: 'KARUYAG KO MABARUAN',
      view_select2_subtitle1: 'PARTE MGA MATERYALES',
      view_select2_subtitle2: 'PAANO MAGHIMO HIN BALAY',
      view_select3_header: 'What do you want to do today?',
      view_select3_title1: 'GIN AANO PAG',
      view_select3_title2: 'ANO AN MGA IMPORTANTE',
      view_select3_subtitle1: 'PADIG.ON TAK BALAY?',
      view_select3_subtitle2: 'NA PARTE HAN BALAY?',
      action_search_here: 'Pag biling',
      title_schools: 'Mga eskwelahan',
      action_setting: 'Settings',

      title_steps: 'PINDOTA AN PAMAAGI PARA MAS MABARUAN AN PROSESO',
      title_checklist: 'Listahan',

      title_guideline_categories: 'Construction Materials',
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

      error_field_cannot_be_empty: 'This field cannot be empty....'
  }
});
