namespace SpriteKind {
    export const Inventory = SpriteKind.create()
    export const Axe = SpriteKind.create()
    export const groundAxe = SpriteKind.create()
    export const handAxe = SpriteKind.create()
}
let inventory = sprites.create(assets.image`Inventory`, SpriteKind.Inventory)
let invItems = {
    1: [""]
}
invItems[1].removeElement("")
let left = true
let player2Hands = ""
let player2 = sprites.create(assets.image`player`, SpriteKind.Player)
let axe = sprites.create(assets.image`Axe`, SpriteKind.groundAxe)
scene.cameraFollowSprite(player2)
player2.setPosition(100, 80)
axe.setPosition(150,150)
controller.moveSprite(player2, 30, 30)
scene.setTileMap(img`
    000000000000000000000000000000000000
    000000000000000000000000000000000000
    000000000000000000000000000000000000
    000099999999999999999999999999999999
    00009...............................
    00009.....2.........................
    00009....2..........................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
    00009...............................
`)
scene.setTile(9,assets.image`wall`,true)
scene.setTile(0,assets.image`grass`)
scene.setTile(2, assets.image`TREE`, true)

inventory.setFlag(SpriteFlag.Invisible, true)
inventory.setPosition(0,0)
let lastX = 0
let lastY = 0
let invOpen = false
controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
    left = true
})
controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
    left = false
})
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
        let invX = -53
        let invY = -44
        invItems[1].forEach((e) => {
            let item = sprites.create(assets.image`ghost`)
            if (e == "Axe") {
                item.setImage(assets.image`Axe`)
                item.setKind(SpriteKind.Axe)
            }
            item.setPosition(lastX + invX,lastY + invY)
        })
        controller.moveSprite(player2, 60, 60)
        player2.setImage(assets.image`pointer`)
        player2.setStayInScreen(true)
        player2.setFlag(SpriteFlag.GhostThroughWalls, true)
        inventory.setFlag(SpriteFlag.Invisible, false)
        inventory.setPosition(player2.x,player2.y)
        inventory.setScale(9, ScaleAnchor.Middle)
        scene.cameraFollowSprite(inventory)
    }
    
})
// invItems[1].insertAt(invItems[1].length, "Item")
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    console.log(player2Hands+" in hands")
    if (invOpen) {
        sprites.allOfKind(SpriteKind.Axe).forEach((e) => {
            console.log(e.image)
        })
        if (sprites.allOfKind(SpriteKind.Axe).length > 0) {
            if (player2.overlapsWith(sprites.allOfKind(SpriteKind.Axe)[0])) {
                player2Hands = "Axe"
            }
        }
        
    }
    else {
        if (player2.overlapsWith(axe)) {
            axe.setFlag(SpriteFlag.Invisible, true)
            axe.setPosition(0,0)
            invItems[1].insertAt(invItems[1].length, "Axe")
        }
        if (player2Hands === "Axe") {
            if (left) {
                let handAxe = sprites.create(assets.image`Axe`, SpriteKind.handAxe)
                handAxe.setPosition(player2.x, player2.y)
                handAxe.image.flipX()
                handAxe.vx = -5
                setTimeout(() => {
                    handAxe.destroy()
                }, 1000)
            }
            else {
                let handAxe = sprites.create(assets.image`Axe`, SpriteKind.handAxe)
                handAxe.setPosition(player2.x, player2.y)
                handAxe.vx = 5
                scene.onHitWall(SpriteKind.handAxe, function(sprite: Sprite, location: tiles.Location) {
                    
                    tiles.setTileAt(location, assets.image`grass`)
                })
                setTimeout(() => {
                    handAxe.destroy()
                },1000)
            }
        }
    }
})