export default class AvailableTheme {
  constructor (id, type, dotColor, dotActiveColor, cardTheme, fontColor) {
    this.id = id
    this.type = type // : string = 'image' | 'css'
    this.dotColor = dotColor // : string = Hex color code e.g. #FF0000
    this.dotActiveColor = dotActiveColor // : string = Hex color code e.g. #DD0000
    this.cardTheme = cardTheme
    this.fontColor = fontColor
  }
}
