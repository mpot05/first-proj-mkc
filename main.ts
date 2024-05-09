namespace SpriteKind {
    export const Inventory = SpriteKind.create()
    export const Axe = SpriteKind.create()
    export const groundAxe = SpriteKind.create()
}
let inventory = sprites.create(assets.image`Inventory`, SpriteKind.Inventory)
let invItems = {
    1: [""]
}
invItems[1].removeElement("")
let player2 = sprites.create(assets.image`player`, SpriteKind.Player)
let axe = sprites.create(assets.image`Axe`, SpriteKind.groundAxe)
scene.cameraFollowSprite(player2)
player2.setPosition(25, 25)
axe.setPosition(30,30)
controller.moveSprite(player2, 30, 30)
scene.setTileMap(img`
    99999999999999999999999999999999
    9...............................
    9.....2.........................
    9....2..........................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
    9...............................
`)
scene.setTile(9,assets.image`wall`,true)
scene.setTile(0,assets.image`grass`)
scene.setTile(2, assets.image`TREE`, true)

inventory.setFlag(SpriteFlag.Invisible, true)
inventory.setPosition(0,0)
let lastX = 0
let lastY = 0
let invOpen = false
controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    if (invOpen) {
        invOpen = false
        sprites.allOfKind(SpriteKind.Axe).forEach((e) => {
            e.destroy()
        })
        player2.x = lastX
        player2.y = lastY
        controller.moveSprite(player2, 30, 30)
        player2.setImage(assets.image`player`)
        player2.setFlag(SpriteFlag.Ghost, false)
        inventory.setFlag(SpriteFlag.Invisible, true)
        inventory.setPosition(0,0)
        scene.cameraFollowSprite(player2)
        
    }
    else {
        invOpen = true
        lastX = player2.x
        lastY = player2.y
        invItems[1].forEach((e) => {
            console.log(e)
            console.log(typeof ``)
            let item = sprites.create(assets.image`ghost`)
            if (e == "Axe") {
                item.setImage(assets.image`Axe`)
                item.setKind(SpriteKind.Axe)
            }
            item.setPosition(lastX-53,lastY-44)
        })
        controller.moveSprite(player2, 60, 60)
        player2.setImage(assets.image`pointer`)
        player2.setStayInScreen(true)
        player2.setFlag(SpriteFlag.Ghost, true)
        inventory.setFlag(SpriteFlag.Invisible, false)
        inventory.setPosition(player2.x,player2.y)
        inventory.setScale(9, ScaleAnchor.Middle)
        scene.cameraFollowSprite(inventory)
    }
    
})
// invItems[1].insertAt(invItems[1].length, "Item")
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (invOpen) {
        
    }
    else {
        if (player2.overlapsWith(axe)) {
            axe.setFlag(SpriteFlag.Invisible, true)
            axe.setPosition(0,0)
            invItems[1].insertAt(invItems[1].length, "Axe")
        }
    }
})