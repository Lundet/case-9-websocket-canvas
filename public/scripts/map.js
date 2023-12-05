class Map {
    constructor({ imageSrc, width, height, borders, player1StartingCordinates, player2StartingCordinates }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
        this.borders = {
            top: borders.top,
            left: borders.left,
            right: borders.right,
            bottom: borders.bottom
        };
        this.player1StartingCordinates = player1StartingCordinates;
        this.player2StartingCordinates = player2StartingCordinates;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
}
