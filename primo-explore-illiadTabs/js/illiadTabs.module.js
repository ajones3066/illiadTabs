'use strict';

angular.module('illiadTabs', []).controller('illiadTabsController', ['angularLoad', '$scope', '$http', 'jwtHelper', function (angularLoad, $scope, $http, jwtHelper) {
  // 	// create a blank object to hold our form information
  //   // $scope will allow this to pass between controller and view
  var token = sessionStorage.getItem("primoExploreJwt");
  var rootScope = $scope.$root;
  var uSMS = rootScope.$$childHead.$ctrl.userSessionManagerService;
  var jwtData = uSMS.jwtUtilService.getDecodedToken();
  var userGroup = parseInt(jwtData.userGroup);
  var user = jwtData.user;
  var userName = jwtData.userName;
  var item = $scope.$parent.$parent.$parent.$parent.$parent.$ctrl.item;
  console.log(user);
  console.log(item);
  $scope.userData = {};
  $scope.requestData = {};
  $scope.requestData.userID = user;
  $scope.requestData.userName = userName;
  $scope.requestData.requestableMedia = ['book', 'audio', 'video', 'score'];
  $scope.requestData.institutionalAvailability = ['available_in_my_institution', 'fulltext', 'fulltext_linktorsrc'];
  $scope.requestData.pickupLocations = [{
    name: 'New School University Center',
    value: 'TNSGI'
  }, {
    name: 'New School List Center',
    value: 'TNSFO'
  }, {
    name: 'New School Performing Arts',
    value: 'TNSSC'
  }]; // ////// Choose what media type goes with which formatPreference ///

  var printDefaults = ['book', 'video', 'audio', 'score'];
  var scanDefaults = ['book chapter', 'article']; // ////// Who has permission to do what ///

  if (printDefaults.indexOf($scope.requestData.type) > -1) {
    $scope.requestData.formatPreference = 'print';
  } else if (scanDefaults.indexOf($scope.requestData.type) > -1) {
    $scope.requestData.formatPreference = 'scan';
  } else $scope.requestData.formatPreference = 'nopref';

  // if ($scope.requestData.formatPreference == 'nopref' || $scope.requestData.formatPreference == 'print') {
  //   $scope.requestData.loanType = 'loan';
  // } else $scope.requestData.loanType = 'article'; // ///// End FormatPreference Section ///////
  // //now we get to the request info //


  if ('recordid' in item.pnx.control) {
    $scope.requestData.pnxRecordId = item.pnx.control.recordid[0];
  } else $scope.requestData.pnxRecordId = '';

  if ('au' in item.pnx.addata) {
    $scope.requestData.author = item.pnx.sort.author[0];
  } else $scope.requestData.author = '';

  $scope.requestData.title = item.pnx.display.title[0];
  $scope.requestData.type = item.pnx.display.type[0];
  $scope.requestData.exactEdition = true;

  if ('isbn' in item.pnx.addata) {
    $scope.requestData.isbn = item.pnx.addata.isbn[0];
  } else $scope.requestData.isbn = '';

  if ('issn' in item.pnx.addata) {
    $scope.requestData.issn = item.pnx.addata.issn[0];
  } else $scope.requestData.issn = '';

  if ('oclcid' in item.pnx.addata) {
    $scope.requestData.oclcid = item.pnx.addata.oclcid[0];
  } else $scope.requestData.oclcid = '';

  if ('identifier' in item.pnx.addata) {
    $scope.requestData.identifier = item.pnx.addata.identifier[0];
  } else $scope.requestData.identifier = '';

  if ('atitle' in item.pnx.addata) {
    $scope.requestData.atitle = item.pnx.addata.atitle[0];
  } else $scope.requestData.atitle = '';

  if ('jtitle' in item.pnx.addata) {
    $scope.requestData.jtitle = item.pnx.addata.jtitle[0];
  } else $scope.requestData.jtitle = '';

  if ('stitle' in item.pnx.addata) {
    $scope.requestData.stitle = item.pnx.addata.stitle[0];
  } else $scope.requestData.stitle = '';

  if ('btitle' in item.pnx.addata) {
    $scope.requestData.btitle = item.pnx.addata.btitle[0];
  } else $scope.requestData.btitle = '';

  if ('pages' in item.pnx.addata) {
    $scope.requestData.pages = item.pnx.addata.pages[0];
  } else $scope.requestData.pages = '';

  if ('spage' in item.pnx.addata) {
    $scope.requestData.spage = item.pnx.addata.spage[0];
  } else $scope.requestData.spage = '';

  if ('epage' in item.pnx.addata) {
    $scope.requestData.epage = item.pnx.addata.epage[0];
  } else $scope.requestData.epage = '';

  if ('volume' in item.pnx.addata) {
    $scope.requestData.volume = item.pnx.addata.volume[0];
  } else $scope.requestData.volume = '';

  if ('issue' in item.pnx.addata) {
    $scope.requestData.issue = item.pnx.addata.issue[0];
  } else $scope.requestData.issue = '';

  if ('pub' in item.pnx.addata) {
    $scope.requestData.publisher = item.pnx.addata.pub[0];
  } else $scope.requestData.publisher = '';

  if ('genre' in item.pnx.addata) {
    $scope.requestData.genre = item.pnx.addata.genre[0];
  } else $scope.requestData.genre = '';

  if ('date' in item.pnx.addata) {
    $scope.requestData.pubDate = item.pnx.addata.date[0];
  } else $scope.requestData.pubDate = '';

  if ('url' in item.pnx.addata) {
    $scope.requestData.url = item.pnx.addata.url[0];
  } else $scope.requestData.url = '';

  if ('doi' in item.pnx.addata) {
    $scope.requestData.doi = item.pnx.addata.doi.valueOf();
  } else $scope.requestData.doi = '';

  $scope.requestData.openurl = '';
  $scope.requestData.notes = ''; //   

  //// Institutional Availability //////

  $scope.requestData.availability = item.delivery.displayedAvailability.valueOf();

  if ($scope.requestData.institutionalAvailability.indexOf($scope.requestData.availability) > -1) {
    document.getElementById("tags").style.setProperty('display', 'none', 'important');
    document.getElementsByTagName("prm-tags-list")[0].style.setProperty('display', 'none', 'important');
  } //   ////// Archives Contingency ///////


  if (!$scope.requestData.requestableMedia.includes($scope.requestData.type)) {
    document.getElementById("tags").style.setProperty('display', 'none', 'important');
    document.getElementsByTagName("prm-tags-list")[0].style.setProperty('display', 'none', 'important');
  } // // figure out permissions for each type of request service


  $scope.checkPermissions = function () {
    $scope.userData.userID = $scope.requestData.userID;
  //  $scope.userData.loanType = $scope.requestData.loanType; //     //now check if the user is a valid user

    $http({
      method: 'POST',
      url: 'http://localhost/illiadv2/checkPermissions.php',
      withCredentials: false,
      data: serialize($scope.userData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // set the headers so angular passing info as form data (not request payload)

      }
    }).then(function userSuccess(response) {
      $scope.permissions = response.data;
      $scope.selectedIndex = $scope.permissions.tab;
    }, function userError(response) {
      $scope.selectedIndex = 4;
    });
  }; // process the form

  function serialize (data) {
    return Object.entries(data).map(function(keyValue) {
      return keyValue.join('=');
    }).join('&');
  }


  $scope.processForm = function () {
     // [['key', 'value'], [...]]
    $http({
      method: 'POST',
      url: 'http://localhost/illiadv2/process.php',
      withCredentials: false,
      data: serialize($scope.requestData),
      // pass in data as strings
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // set the headers so angular passing info as form data (not request payload)

      }
    }).then(function mySuccess(response) {
      $scope.message = response.data;
      $scope.success = response.successMessage;
      $scope.selectedIndex = 2;
    }, function myError(response) {
      $scope.message = response.data;
      $scope.success = response.errorMessage;
      $scope.selectedIndex = 3;
    });
  };

  $scope.resetForm = function () {
    $scope.requestData.notes = null;
    $scope.requestData.dateNeededBy = new Date().format('MM/DD/YY');
    $scope.requestData.formatPreference = 'nopref';
  };
}]).component('illiad', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'illiadTabsController',
  template: "<div data-ng-init=\"checkPermissions()\" class=\"margin-bottom-small display-block\"><div class=\"layout-align-center-center\" role=\"alert\" layout-align=\"center center\"><div class=\"bar alert-bar zero-margin-bottom layout-align-center-center layout-row\" layout=\"row\" layout-align=\"center center\" ng-show=\"requestData.userName === null\"><span class=\"bar-text margin-right-small\">Please sign in to see request options and to place requests.</span><prm-authentication><button class=\"button-with-icon zero-margin md-button md-primoExplore-theme md-ink-ripple\" type=\"button\" aria-label=\"Login\" ng-click=\"$ctrl.handleLogin();\"><prm-icon icon-type=\"svg\" svg-icon-set=\"primo-ui\" icon-definition=\"sign-in\"><md-icon md-svg-icon=\"primo-ui:sign-in\" alt=\"\" class=\"md-primoExplore-theme\" aria-hidden=\"true\"><svg id=\"sign-in_cache436\" width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" y=\"192\" xmlns=\"http://www.w3.org/2000/svg\" fit=\"\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\"><path d=\"M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z\"></path></svg></md-icon></prm-icon><span translate=\"eshelf.signin.title\">Login</span></button></prm-authentication></div></div></div><div><md-tabs md-selected=\"selectedIndex\" ng-show=\"requestData.userName.length > 0\" class=\"tabs-as-app hidden-tabs md-dynamic-height md-primoExplore-theme\" md-dynamic-height=\"\"><md-tab label=\"Not Logged In\"><md-content layout=\"column\" class=\"_md md-primoExplore-theme layout-column\"><div class=\"bar large-bar layout-fill layout-padding layout-align-center-center layout-row\" layout=\"row\" layout-align=\"center center\" layout-padding=\"\" layout-fill=\"\" style=\"\"><span>Checking Permissions...</span></div></md-content></md-tab><md-tab label=\"Book/DVD/Score\"><md-content class=\"_md md-no-transition md-active md-no-scroll\" role=\"tabpanel\"><form class=\"ng-pristine ng-valid-mindate ng-valid-maxdate ng-valid-filtered ng-valid-valid ng-valid-pattern ng-valid-maxlength ng-valid ng-valid-required\"><!-- new flex design --><div class=\"illiadWrapper\"><article class=\"illiadMain\"><div><p><span class=\"bold-text\">Type</span><br /><span>{{ requestData.type }}</span></p></div><div ng-show=\"requestData.title\"><p><span class=\"bold-text\">Title</span><br /><span>{{ requestData.title }}</span></p></div><div ng-show=\"requestData.creator\"><p><span class=\"bold-text\">Creator</span><br /><span>{{ requestData.creator }}</span></p></div></article><aside class=\"illiadAside illiadAside-2\"><!-- this is where form elements go --><div layout=\"row\" class=\"layout-full-width\" layout-align=\"center center\"><md-input-container class=\"md-primoExplore-theme md-input-has-value\" ><label class=\"\" for=\"requestData.formatPreference\">Format Preference</label><md-radio-group layout=\"row\" ng-model=\"requestData.formatPreference\"><md-radio-button value=\"nopref\">Any Format</md-radio-button><md-radio-button value=\"print\" class=\"md-primary\" style=\"text-align:left\">Physical</md-radio-button><md-radio-button value=\"electronic\">Electronic</md-radio-button></md-radio-group></md-input-container></div><div layout=\"row\" layout-align=\"center center\" class=\"layout-full-width\" ng-show=\"requestData.formatPreference === 'print' || requestData.formatPreference === 'nopref'\"><!-- select starts here --><md-input-container class=\"underlined-input md-primoExplore-theme md-required md-input-has-value\"><label for \"requestData.pickupLocation\">Pickup Location</label><md-select class=\"ng-pristine md-primoExplore-theme ng-empty ng-valid ng-valid-required ng-touched\" ng-model=\"requestData.pickupLocations\" aria-expanded=\"false\" aria-multiselectable=\"false\" aria-required=\"false\" aria-disabled=\"false\" aria-invalid=\"false\" style=\"\" tabindex=\"0\" role=\"listbox\"><md-option ng-repeat=\"pickupLocation in requestData.pickupLocations track by pickupLocation.value\" ng-selected=\"{{pickupLocation.value === 'TNSGI'}}\" ng-value=\"pickupLocation.value\">{{ pickupLocation.name }}</md-option></md-select><!-- select ends here --></md-input-container></div><!-- this is where pages go --><div layout=\"row\" ng-show=\"requestData.formatPreference === 'scan'\" layout-align=\"center center\" class=\"layout-full-width\"><md-input-container class=\"underlined-input md-primoExplore-theme\" ><label class=\"\" for=\"pages\">Pages</label><input ng-model=\"requestData.pages\" name=\"pages\" maxlength=\"\" class=\"ng-pristine md-input ng-empty ng-valid-pattern ng-valid-maxlength ng-valid ng-valid-required ng-touched\" id=\"pages\" aria-invalid=\"false\" style=\"\" type=\"text\" placeholder=\"e.g. pg. 20-40\"><!----></md-input-container></div><!-- this is where pages end --><!-- this is notes start --><div layout=\"row\" layout-align=\"center center\" class=\"layout-full-width\"><md-input-container class=\"underlined-input md-primoExplore-theme\" ><label class=\"\" for=\"input_439\">Notes</label><input ng-model=\"requestData.notes\" name=\"notes\" maxlength=\"\" class=\"ng-pristine md-input ng-empty ng-valid-pattern ng-valid-maxlength ng-valid ng-valid-required ng-touched\" id=\"input_439\" aria-invalid=\"false\" style=\"\" type=\"text\" placeholder=\"e.g. vol. 15\"><!----></md-input-container></div><div layout=\"row\" class=\"layout-full-width\" layout-align=\"center center\"><md-checkbox name=\"exactEdition\" ng-model=\"requestData.exactEdition\" type=\"checkbox\" role=\"checkbox\" class=\"md-primoExplore-theme ng-dirty ng-valid-parse ng-empty ng-invalid ng-invalid-required ng-touched\" aria-label=\"Exact Edition?\"><div class=\"md-container md-ink-ripple\" md-ink-ripple=\"\" md-ink-ripple-checkbox=\"\"><div class=\"md-icon\"></div><div class=\"md-ripple-container\"></div></div><div class=\"md-label\">Exact Edition</div></md-checkbox></div><!-- this is notes end --><div layout=\"row\" layout-align=\"end\" class=\"layout-full-width layout-align-end-stretch layout-row\"><button class=\"button-with-icon button-secondary md-button md-primoExplore-theme md-ink-ripple\" type=\"button\" (click)=\"resetForm()\"><prm-icon icon-type=\"svg\" svg-icon-set=\"primo-ui\" icon-definition=\"reload\"><md-icon md-svg-icon=\"primo-ui:reload\" alt=\"\" class=\"md-primoExplore-theme\" aria-hidden=\"true\"><svg id=\"reload\" width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" y=\"552\" xmlns=\"http://www.w3.org/2000/svg\" fit=\"\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\"><path d=\"M19,12H22.32L17.37,16.95L12.42,12H16.97C17,10.46 16.42,8.93 15.24,7.75C12.9,5.41 9.1,5.41 6.76,7.75C4.42,10.09 4.42,13.9 6.76,16.24C8.6,18.08 11.36,18.47 13.58,17.41L15.05,18.88C12,20.69 8,20.29 5.34,17.65C2.22,14.53 2.23,9.47 5.35,6.35C8.5,3.22 13.53,3.21 16.66,6.34C18.22,7.9 19,9.95 19,12Z\"></path></svg></md-icon><prm-icon-after></prm-icon-after></prm-icon><span>Reset Form</span><div class=\"md-ripple-container\" style=\"\"></div></button><span flex=\"\" class=\"flex\"></span><button ng-click=\"processForm()\" class=\"button-with-icon button-confirm md-button md-primoExplore-theme md-ink-ripple\" type=\"submit\" aria-label=\"Send Request\"><prm-icon icon-type=\"svg\" svg-icon-set=\"primo-ui\" icon-definition=\"send\"><md-icon md-svg-icon=\"primo-ui:send\" alt=\"\" class=\"md-primoExplore-theme\" aria-hidden=\"true\"><svg id=\"send\" width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" y=\"672\" xmlns=\"http://www.w3.org/2000/svg\" fit=\"\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\"><path d=\"M2,21L23,12L2,3V10L17,12L2,14V21Z\"></path></svg></md-icon><prm-icon-after></prm-icon-after></prm-icon><span>Send Request</span></button></div></aside></div></form><!--END FLEX --></md-content></md-tab><!--Tab index2 - application response --><md-tab label=\"Application Success\"><md-content layout=\"column\" class=\"_md md-primoExplore-theme layout-column\"><div class=\"bar large-bar layout-fill layout-padding layout-align-center-center layout-row success-bar\" layout=\"row\" layout-align=\"center center\" layout-padding=\"\" layout-fill=\"\" style=\"\"><span>{{ message.message }}</span></div></md-content></md-tab><!--Tab index3 - application response --><md-tab label=\"Application Failure\"><md-content layout=\"column\" class=\"_md md-primoExplore-theme layout-column\"><div class=\"bar large-bar layout-fill layout-padding layout-align-center-center layout-row error-bar\" layout=\"row\" layout-align=\"center center\" layout-padding=\"\" layout-fill=\"\" style=\"\"><span>ERROR! You do not have permission to request this material.<br />Please contact <a href=\"http://answers.library.newschool.edu\" target=\"_blank\"><u>Ask Us</u></a> for assistance.</span></div></md-content></md-tab><md-tab label=\"Application Failure\"><md-content layout=\"column\" class=\"_md md-primoExplore-theme layout-column\"><div class=\"bar large-bar layout-fill layout-padding layout-align-center-center layout-row error-bar\" layout=\"row\" layout-align=\"center center\" layout-padding=\"\" layout-fill=\"\" style=\"\"><span>ERROR! There is a system failure.  Please contact <a href=\"http://answers.library.newschool.edu\" target=\"_blank\"><u>Ask Us</u></a> for assistance.</span></div></md-content></md-tab></md-tabs></div>"
});
