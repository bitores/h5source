(function () {
    'use strict';

    angular
      .module('crmApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'route-segment',
        'view-segment',
        'ui.bootstrap',
        'angularFileUpload'
      ])
      .config(['$routeProvider', '$routeSegmentProvider', '$httpProvider',
        function ($routeProvider, $routeSegmentProvider, $httpProvider) {
            $httpProvider.defaults.timeout = 500;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.useXDomain = true;

            $routeSegmentProvider.options.autoLoadTemplates = true;
            $routeSegmentProvider
              .when('/login', 'login')
              .when('/main', 'main')
              .when('/manage', 'manage.list')
              .when('/mycustom', 'mycustom.list')
              .when('/addcustom', 'custom.add')
              .when('/unimport', 'custom.unimport')
              .when('/importcustom', 'custom.import')
              .when('/customdetail/:customerid', 'custom.detail')
              //lax----tjdate
              .when('/book', 'book.step1')
              .when('/bookstep1', 'book.step1')
              .when('/bookstep2/:mealId', 'book.step2')
              .when('/bookstep3/:bookid/:booktype', 'book.step3')
              .when('/bookok', 'book.bookok')
              .when('/bookfail', 'book.bookfail')
              .when('/order', 'order')
              .when('/ordermanage/:groupId', 'order.manage')
              .when('/orderdetail/:ordernum', 'order.detail')
              .when('/orderlist/:batchId', 'order.list')
              .when('/ordersummrise', 'order.summrise')
              .when('/ordermanage', 'order.ordermanage')
              .when('/asset', 'asset.list')
              .when('/charge', 'asset.charge')
              .when('/alipay', 'asset.alipay')
              .when('/alipayok', 'asset.alipayok')
              .when('/alipayfail', 'asset.alipayfail')
              .when('/inoutdetail', 'asset.detail')
              .when('/distributerecord', 'asset.distribute')
              .when('/deposit', 'asset.deposit')
              .when('/proxyrecharge/:cardnum', 'asset.proxyrecharge.floatlayer')
              .when('/account', 'account.info')
              .when('/modifyaccount', 'account.modify')
              .when('/changepass', 'account.pass')
              .segment('main', {
                  default: true,
                  templateUrl: 'views/main.html',
                  controller: 'MainCtrl'
              })
              .segment('login', {
                  templateUrl: 'views/login.html',
                  controller: 'LoginCtrl'
              })
              .segment('manage', {
                  templateUrl: 'views/manage/manage.html',
                  controller: 'ManageCtrl'
              })
              .within()
                .segment('list', {
                    templateUrl: 'views/manage/managelist.html'
                })
              .up()
              .segment('mycustom', {
                  templateUrl: 'views/custom/custom1.html',
                  controller: 'CustomCtrl'
              })
              .within()
                .segment('list', {
                    templateUrl: 'views/custom/customlist.html'
                })
              .up()
              .segment('custom', {
                  templateUrl: 'views/custom/custom.html',
                  controller: 'CustomCtrl'
              })
              .within()
                .segment('unimport', {
                    templateUrl: 'views/custom/unimport.html'
                })
                .segment('add', {
                    templateUrl: 'views/custom/addcustom.html'
                })
                .segment('import', {
                    templateUrl: 'views/custom/importcustom.html'
                })
                .segment('detail', {
                    templateUrl: 'views/custom/customdetail.html',
                    dependencies: ['customerid']
                })
              .up()
              .segment('book', {
                  templateUrl: 'views/book/book.html',
                  controller: 'BookCtrl'
              })
              .within()
                .segment('step1', {
                    templateUrl: 'views/book/book_step1.html'
                })
                .segment('step2', {
                    templateUrl: 'views/book/book_step2.html',
                    dependencies: ['mealId']
                })
                .segment('step3', {
                    templateUrl: 'views/book/book_step3.html',
                    dependencies: ['bookid', 'booktype']
                })
                .segment('bookok', {
                    templateUrl: 'views/book/book_payok.html'
                })
                .segment('bookfail', {
                    templateUrl: 'views/book/book_payfail.html'
                })
              .up()
              .segment('order', {
                  templateUrl: 'views/order/order.html',
                  controller: 'OrderCtrl',
              })
              .within()
                .segment('manage', {
                    templateUrl: 'views/order/ordermanage.html',
                	dependencies: ['groupId']
                })
                .segment('list', {
                    templateUrl: 'views/order/orderlist.html',
                	dependencies: ['batchId']
                })
                .segment('detail', {
                    templateUrl: 'views/order/orderdetail.html',
                    dependencies: ['ordernum']
                })
                .segment('summrise', {
                    templateUrl: 'views/order/ordersummrise.html'
                })
                .segment('ordermanage', {
                    templateUrl: 'views/order/ordermanage.html'
                })
              .up()
              .segment('asset', {
                  templateUrl: 'views/asset/asset.html',
                  controller: 'AssetCtrl'
              })
              .within()
                .segment('list', {
                    templateUrl: 'views/asset/assetlist.html'
                })
                .segment('alipay', {
                    templateUrl: 'views/asset/alipay.html'
                })
                .segment('alipayok', {
                    templateUrl: 'views/asset/alipayok.html'
                })
                .segment('alipayfail', {
                    templateUrl: 'views/asset/alipayfail.html'
                })
                .segment('charge', {
                    templateUrl: 'views/asset/charge.html'
                })
                .segment('detail', {
                    templateUrl: 'views/asset/inoutdetail.html'
                })
                .segment('distribute', {
                    templateUrl: 'views/asset/distributerecord.html'
                })
                .segment('deposit', {
                    templateUrl: 'views/asset/deposit.html'
                })
                .segment('proxyrecharge', {
                    templateUrl: 'views/asset/proxyrecharge.html',
                    dependencies: ['cardnum']
                })
                .within()
                    .segment('floatlayer', {
                        templateUrl: 'views/asset/asset_floatlayer.html'
                    })
                .up()
              .up()
              .segment('account', {
                  templateUrl: 'views/account/account.html',
                  controller: 'AccountCtrl'
              })
              .within()
                .segment('info', {
                    templateUrl: 'views/account/accountinfo.html'
                })
                .segment('modify', {
                    templateUrl: 'views/account/modifyaccount.html'
                })
                .segment('pass', {
                    templateUrl: 'views/account/changepass.html'
                });

            $routeProvider.otherwise({ redirectTo: '/main' });

            // configure $http to catch message responses and show them
            $httpProvider.responseInterceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
                var setMessage = function (response) {
                    // if the response has a text and a type property, it is a
                    // message to be shown
                    if (response.data.text && response.data.type) {
                        $rootScope.message = {
                            text: response.data.text,
                            type: response.data.type,
                            show: true
                        };
                    }
                };

                return function (promise) {
                    return promise.then(
                      // this is called after each successful server request
                      function (response) {
                          setMessage(response);
                          return response;
                      },
                      // this is called after each unsuccessful server request
                      function (response) {
                          setMessage(response);
                          return $q.reject(response);
                      });
                };
            }]);
            
        }]);

    angular.module('crmApp').filter('routeSegmentStartsWith', [
      '$routeSegment',
      function ($routeSegment) {
          return function (segment) {
              return $routeSegment.startsWith(segment);
          };
      }
    ]);

    angular.module('crmApp').filter('worknameFilter',
       function () {
           return function (workName, lastCompany) {
               return lastCompany ? lastCompany : workName;
           };
       }
    );
    angular.module('crmApp').filter('mobileMergeIdCardFilter',
        function () {
            return function (mobile, idCard) {
                if (mobile && idCard) {
                    return mobile + '/' + idCard;
                } else if (mobile) {
                    return mobile;
                } else if (idCard) {
                    return idCard;
                } else {
                    return '';
                }

            };
        }
    );

    angular.module('crmApp').filter('gender', [
      '$routeSegment',
      function ($routeSegment) {
          return function (gender) {
              if (gender === 0 || gender === '0') {
                  return '男';
              } else {
                  return '女';
              }
          };
      }
    ]);

    angular.module('crmApp').filter('marry',
       function () {
           return function (married) {
               if (null == married || undefined == married) {
                   return '';
               } else if (married === 0 || married === '0') {
                   return '未婚';
               } else if (married === 1 || married === '1') {
                   return '已婚';
               } else {
                   return married;
               }

           };
       }
     );

    angular.module('crmApp').filter('parseInt',
       function () {
           return function (numberStr) {
               return parseInt(numberStr);
           };
       }
     );

    angular.module('crmApp').filter('getBookDetail',
        function () {
            return function (bookDetail, keyWord) {
                var detail = eval('(' + bookDetail + ')');
                if ('meal' === keyWord) {
                    return detail[keyWord][0].name;
                }
                return detail[keyWord];
            };
        }
    );

    //有导入年龄的情况下，显示导入年龄
    angular.module('crmApp').filter('showImportAge',
    		function () {
    		    return function (age, customer) {
    		        return customer.idcard ? customer.age : customer.importAge;
    		    };
    		}
    );

    angular.module('crmApp').filter('mergeLastBook',
            function ($filter) {
                return function (lastBookTime, lastBookMoney) {
                    if (lastBookTime) {
                        return $filter('date')(lastBookTime, 'yyyy-MM-dd') + "/" + $filter('currency')(lastBookMoney / 100, '\u00A5');
                    } else {
                        return "";
                    }
                };
            }
    );
    
    angular.module('crmApp').filter('dateWeek',
    		function ($filter) {
    	return function (date, formatStr) {
			return $filter('date')(date, formatStr) + " 星期" + '日一二三四五六'.charAt(new Date(date).getDay());
    	};
    }
    );

    angular.module('crmApp')
    .directive('focus', function () {
        return {
            link: function postLink(scope, element, attrs) {
                element[0].focus();
            }
        };
    });

    angular.module('crmApp').filter("index",
    		function () {
    		    return function (array) {
    		        return (array || []).map(function (item, index) {
    		            item.order = index + 1;
    		            return item;
    		        });
    		    };
    		}
                    );

    angular.module('crmApp')
      .run(['$rootScope', '$location', '$window', 'Login', function ($rootScope, $location, $window, Login) {
    	  
    	  //打开体检中心余量查询页面
    	  $rootScope.openHosLastAmount = function (){
  	        var url = $window.actionContextPath + '/hosLastStatistic/null/null';
  	        $(".toHosLastAmount").attr("href",url);
  	      }

          $rootScope.logout = function () {
              Login.logout();
          };

          $rootScope.$watch("isLogin", function () {
              var terval;
              if ($rootScope.isLogin == true) {
                  $.ajax({
                      type: "get",
                      url: "/crm/action/orderPaymentStatus",
                      dataType: "json",
                      complete: function (data) {
                      },
                      success: function (data) {
                          var number = 0, html = '<i class="triangle_top_white"></i><ul>';
                          var grouids = [
                              {
                                  groupId: 0,
                                  paymentStatus: 0
                              }
                          ];
                          if (data.length == 0) {
                              html += '<li class="list-info">\
                                    <p class="color666">没有最新消息</p>\
                                </li>';
                          }
                          for (var x in data) {
                              var type = 0, ten = 0;
                              for (var i in grouids) {
                                  if (grouids[i].groupId != data[x].groupId) {
                                      type = 1;
                                  } else {
                                      grouids[i].paymentStatus = data[x].paymentStatus
                                  }
                                  if (grouids[i].groupId == data[x].groupId) {
                                      ten = 1;
                                  }
                              }
                              if(type = 1 && ten == 0){
                                  var list = {
                                      groupId: data[x].groupId,
                                      paymentStatus: data[x].paymentStatus,
                                      time: data[x].time
                                  }
                                  grouids.push(list);
                              }
                          }
                          grouids.shift();
                          for (var k in grouids) {
                              var number = number + 1;
                              var d = new Date();
                              d.setTime(grouids[k].time);
                              var s = d.toLocaleString();
                              $(".bgcolorange").html(number);
                              $(".bgcolorange").show();
                              
                              if (grouids[k].paymentStatus == 4 || grouids[k].paymentStatus == 0) {
                                  html += '<li class="list-info">\
                                            <p class="color999">'+ s + '</p>\
                                            <p class="color666">提交1个订单<span class="payin">支付中</span></p>\
                                        </li>';
                              }
                              if (grouids[k].paymentStatus == 1) {
                                  html += '<li class="list-info">\
                                            <p class="color999">'+ s + '</p>\
                                            <p class="color666">提交1个订单<span class="payoks">支付成功</span></p>\
                                        </li>';
                              }
                              if (grouids[k].paymentStatus == 2) {
                                  html += '<li class="list-info">\
                                            <p class="color999">'+ s + '</p>\
                                            <p class="color666">提交1个订单<span class="payout">支付失败</span></p>\
                                        </li>';
                              }
                          }
                          html +='</ul>'
                          if (number == 0) {
                              $(".bgcolorange").hide();
                          }
                          $(".head .message .list").html(html)
                      },
                      error: function (data) {
                      }
                  });
                  terval = setInterval(function () {
                      $.ajax({
                          type: "get",
                          url: "/crm-web/action/orderPaymentStatus",
                          dataType: "json",
                          complete: function (data) { },
                          success: function (data) {
                              var number = 0, html = '<i class="triangle_top_white"></i><ul>';
                              var grouids = [
                                  {
                                      groupId: 0,
                                      paymentStatus: 0
                                  }
                              ];
                              for (var x in data) {
                                  var type = 0, ten = 0;
                                  for (var i in grouids) {
                                      if (grouids[i].groupId != data[x].groupId) {
                                          type = 1;
                                      } else {
                                          grouids[i].paymentStatus = data[x].paymentStatus
                                      }
                                      if (grouids[i].groupId == data[x].groupId) {
                                          ten = 1;
                                      }
                                  }
                                  if (type = 1 && ten == 0) {
                                      var list = {
                                          groupId: data[x].groupId,
                                          paymentStatus: data[x].paymentStatus,
                                          time: data[x].time
                                      }
                                      grouids.push(list);
                                  }
                              }
                              grouids.shift();
                              for (var k in grouids) {
                                  var number = number + 1;
                                  var d = new Date();
                                  d.setTime(grouids[k].time);
                                  var s = d.toLocaleString();
                                  $(".bgcolorange").html(number);
                                  $(".bgcolorange").show();
                                  if (grouids.length == 0) {
                                      html += '<li class="list-info">\
                                            <p class="color666">没有最新消息</p>\
                                        </li>';
                                  }
                                  if (grouids[k].paymentStatus == 4 || grouids[k].paymentStatus == 0) {
                                      html += '<li class="list-info">\
                                            <p class="color999">'+ s + '</p>\
                                            <p class="color666">提交1个订单<span class="payin">支付中</span></p>\
                                        </li>';
                                  }
                                  if (grouids[k].paymentStatus == 1) {
                                      html += '<li class="list-info">\
                                            <p class="color999">'+ s + '</p>\
                                            <p class="color666">提交1个订单<span class="payoks">支付成功</span></p>\
                                        </li>';
                                  }
                                  if (grouids[k].paymentStatus == 2) {
                                      html += '<li class="list-info">\
                                            <p class="color999">'+ s + '</p>\
                                            <p class="color666">提交1个订单<span class="payout">支付失败</span></p>\
                                        </li>';
                                  }
                              }
                              html += '</ul>'
                              if (number == 0) {
                                  $(".bgcolorange").hide();
                              }
                              $(".head .message .list").html(html)
                          },
                          error: function (data) { }
                      });
                  }, 60000);
              } else {
                  clearInterval(terval);
              }



          });

          $rootScope.currentDate = function () {
              var weekDay = '日一二三四五六'.charAt(new Date().getDay());
              return new Date().toLocaleString() + ' 星期' + weekDay;
          };

          //当URL变更的时候，不显示异常信息  
          $rootScope.$on('$locationChangeStart', function () {
              $rootScope.isLoading = true;
              $rootScope.message = { show: false };
          });
          $rootScope.$on('$locationChangeSuccess', function () {
              $rootScope.isLoading = false;
          });

          $rootScope.$watch('message', function () {
              if ($rootScope.message && $rootScope.message.text) {
                  if ($rootScope.message.text.indexOf('用户登录已过期，请重新登陆') != -1) {
                      $rootScope.isLogin = false;
                      $location.path('/login');
                  }
              }
          });

      }]);

}());

window.actionContextPath = 'action';
//window.actionContextPath = 'http://127.0.0.1:8080/crm-web/action';