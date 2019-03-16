/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 10:16:12 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 10:22:28
 */
## webp
webp是谷歌开发的一种现代化图片格式

## 兼容性
目前兼容谷歌系列浏览器、Chrome、Opera、Android

## 优势
webp格式的图片比其他格式的图片大大缩小，有时比jpg格式小25%以上

## 使用
在HTML中，使用picture标签，并且引入picturefill.js兼容不支持picture标签的浏览器
在CSS中，先通过脚本检测客户端是否支持webp，支持则在html根节点加上.webp类名

```css
@mixin bg($url){
  background-image: url($url);
  @at-root(with:all) .webps & {
    background-image: url($url + '.webp')
  }
}
```