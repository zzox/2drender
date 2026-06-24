import { Buffer, createBuffer } from '../core/buffer'
import { FPS, TileHeight, TileWidth } from '../core/const'
import { clear, Color, color, drawImage, drawPixel, fillRect, drawTile, drawRect, drawSpacedTile } from '../core/draw'
import { justPressed, keys } from '../core/keys'
import { Scene } from '../core/scene'
import { Black, Grey, White, Transparent, Orange, half, Pink, Yellow } from '../data/colors'
import { Debug } from '../util/debug'
import { forEachGI, getGridItem, Grid, makeGrid, setGridItem } from '../util/grid'

const HalfBlack = color(0, 0, 0, 128)

enum Dir {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down',
}

enum LR {
  Left = Dir.Left,
  Right = Dir.Right
}

enum UD {
  Up = Dir.Up,
  Down = Dir.Down
}

export class TestScene implements Scene {
  width:number
  height:number

  buf:Buffer
  mask:Buffer
  cover:Buffer

  image?:Buffer
  bgColor:Color

  walls!:Grid<number>

  constructor (width:number, height:number) {
    this.width = width
    this.height = height
    this.bgColor = color(12, 17, 1)

    this.buf = createBuffer(this.width, this.height)
    this.mask = createBuffer(this.width, this.height)
    this.cover = createBuffer(this.width, this.height)
  }

  update () {
    const delta = 1 / FPS
  }

  draw ():Buffer {
    clear(this.buf, this.bgColor)
    clear(this.mask, Transparent)
    clear(this.cover, HalfBlack)
    // drawPixel(this.buf, Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height), { r: 123, g: 123, b: 123, a: 255 })

    if (Debug.on) {}

    fillRect(this.buf, 12, 4, 24, 12, Orange)

    for (let i = 0; i < 100; i++) {
      drawSpacedTile(this.image!, this.buf, 0, Math.floor(Math.random() * 300))
    }

    // stamp `mask` data onto `cover`
    for (let i = 0; i < this.cover.data.length; i++) {
      if (this.mask.data[i] > 0) {
        this.cover.data[i] = 0
      }
    }
    // // drawImage(this.mask, this.buf, 0, 0, 0, 0, this.width, this.height)
    // drawImage(this.cover, this.buf, 0, 0, 0, 0, this.width, this.height)

    return this.buf
  }
}
