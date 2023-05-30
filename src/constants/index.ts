/** 本身app访问ip */
export const BASEURL = 'http://114.132.187.155:7051';
//http://136.25.60.143:30331
//http://136.6.142.53:30285
//http://zhjf.eda.test.cq.ctc.com:12080
//http://zhjf-ccse.eda.cq.ctc.com:11005

/** 语音接口 */
export const VOICEBASEURL = 'http://136.6.187.131:13003/videoController/voiceSteam';

/** 工作助手app访问ip */
export const WORKER_BASEURL = 'http://cqvpnin.118114.cq.cn:30011/11564242';

/** 文件上传 */
export const UPLOADFILE = `${BASEURL}/airoom/service-sysmgr/FileController/auth/uploadImage`;

/** 工作助手文件上传 */
export const WORKER_UPLOADFILE = `${WORKER_BASEURL}/airoom/service-sysmgr/FileController/auth/uploadImage`;

//https://cdt.cq.189.cn/iworkapi/test/11914501
//http://cqvpnin.118114.cq.cn:30011/11564242

/** 工作助手加密key */
export const WORKER_KEY = 'Q2x3Xydv3L3YW7Xs';
//QihfSCPru51O8oDy
//Q2x3Xydv3L3YW7Xs

/** 工作助手appid */
export const WORKER_APPID = '11564242';
//11914501
//11564242

/** rsa私钥 */
export const PRIVATE_KEY = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAI7oUwnv8kj3JR7DNMFJgV3qXpoO9YZBOx7hgbdbq5AG2La8VUJddHs5PwNJacEWFndrBxHtXuYMu2omQFprTTQjMmp9avcJla4dmff2U/LYiTlOeXisJ84nM41A6Ew7+mUfRy7acz38g0Dlg9e7Dk7h6uBsRhz8Bc1q96WZguZ/AgMBAAECgYAl3h4S5ggXmZW2fxd9mFK1ZiNHQ2t/9c0Ks8rBoYLmmUnXsjQNb+IrvNGbt1pUldvCLRQkhfe9keYfjJ9E1mYQX+O9QcC+R5BxTgCrMP7gpGkzLk3hKls6gZAoW5M/2S74s8689wckXRPI63bkSBT7vp9avLbuNQB1F//+GI6JcQJBAPhVlpRLbDMPP+3bzli+6vLZTmuGDz/0VAwhYE2Ut6iy8Xmq94CczMTsT7z80lDQSngSkFVH3vxElnNkQtUHtpUCQQCTUZ9C/LFtM5mjQdhWDj2JfxmQtRfAZf95hkA8erZx3Ob493RTM9LU8AoVGdmHtN2IBO4O4+Z+qzgUqMn6ocfDAkEAqkTMzPr1wgCXvbfzQIgOwdnbWf/+HsSgh/yuciMg1gtzZA+kScu43uCEP7k9Xumh1bgsvDxeGKvSWGYLKNN0DQJAMfTr3Ptz72QgJYyeoBAULhw7vyap90SfbcZo4hl65QHUEXlYqR5Z0HvV73HkonBi7008rS/7adkGG3thgux5oQJANJdO8jlXmOxB/J3ijLd3olLqLz1W1dU+y5rZt4xlYKjnruoRgHCm9PA06quu484hVgabm7UkaI0j/gI9ubBs3A==`;

/** GIS 地图图层资源文件 样式二(深色地图) */
export const GIS_TILE_LAYER_1 = BASEURL + '/ctgmap/map/elec/ct_blue_map_gcj02/server/wmts/';

/** GIS 地图图层资源文件 样式一(电子地图) */
export const GIS_TILE_LAYER_2 = BASEURL + '/arcgis/rest/services/map/China_BaseMap/MapServer';
