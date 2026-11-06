# Plan of Salvation Quest

A board game for children ages 6 to 10, for 1 to 4 players on one phone, tablet or computer. Players move along the plan of salvation, from premortal life through earth life, the spirit world and the Resurrection, until they get home. The game reinforces what children have been taught in Primary and family home evening.

It is built around President Russell M. Nelson's invitation to "overcome the world" (October 2022 general conference) and the handout "The Quest": each player builds a house on the rock with 13 foundation stones, and the storms are the "plagues of the world" he named.

## Playing

Open `index.html` in any web browser. It's one file and needs no install. Without internet it still works, but it uses simpler fonts and the scripture links won't open.

1. Choose 1 to 4 players and type their names.
2. On your turn, tap **Spin** (1 to 8) and move.
3. **Stop at every gold milestone**: Council in Heaven, Born on Earth, Baptism, The Savior, Temple, Spirit World and Resurrection. You stop even if you have moves left.
4. Do what the space says:

| Space | What happens |
|---|---|
| Scripture | Finish the verse: pick the missing word. +2 ★ if right, +1 ★ for reading it together. |
| Foundation | Read a scripture and tell everyone one way you can live it. You earn that foundation stone. |
| Choose the Right | Choose what to do in a real-life situation. The right choice the first time gives +3 ★ and a stone. If you choose wrong you can choose again for +1 ★, because repentance is part of the plan. |
| Storm | Pride, anger, jealousy, fear, greed, hatred or arrogance. If your stones (+1 for the Holy Ghost after baptism) are at least the storm's strength, your house stands: +2 ★. If not, you lose 2 ★. |
| Service | Pick another player to help. You both get +1 ★. |
| Song | Sing or hum a Primary song together: +2 ★. |
| Sabbath | Land here for +2 ★ and the sacrament stone. Pass it for +1 ★. |

5. The first player home gets +5 ★, the second +3, the third +2 and the fourth +1.
6. The game ends when everyone is home. **Score = blessings + 2 for each foundation stone + 1 for each storm overcome.** Highest score wins.

Tap **Read aloud** on any card to have it read to younger players. A game in progress is saved, so you can close the page and continue later on the same device.

## Changing the pictures

Every picture has a slot name. You can replace pictures two ways.

**For everyone who plays from this folder:** save a picture into `images/` with the slot's name, for example `images/baptism.jpg`. The game uses it automatically. To use a different file name or type, edit the `IMAGES` list near the top of the script in `index.html`.

| Slot | Picture | Slot | Picture |
|---|---|---|---|
| `premortal` | Premortal life (Start) | `rock` | House on the rock (Foundation cards) |
| `council` | Council in heaven | `storm` | Storm cards |
| `birth` | Born on earth | `scripture` | Scripture cards |
| `baptism` | Baptism | `choose` | Choose the Right cards |
| `savior` | Jesus Christ, our Savior | `service` | Service cards |
| `temple` | Temple | `song` | Song cards |
| `spiritworld` | Spirit world | `sabbath` | Sabbath / sacrament |
| `resurrection` | Resurrection | `home` | Eternal life (Home) |

**On one device:** tap **Pictures** in the game, then **Upload** on a slot. You can also paste a picture link. Pictures chosen this way are saved only in that browser.

Find pictures in the Church [Media Library](https://www.churchofjesuschrist.org/media/images?lang=eng) and the [Gospel Art Book](https://www.churchofjesuschrist.org/media/collection/gospel-art-book-images?lang=eng). Church images may be used for non-commercial family and Church use. Check each image's usage notes on the site.

## Changing the content

All cards live in the script in `index.html`:

- `SCRIPTURES` holds the finish-the-verse cards.
- `STONES` holds the 13 foundation stones.
- `CHOICES` holds the Choose the Right situations.
- `STORMS` holds the storms.
- `SONGS` holds the Primary songs.
- `MILES` holds the milestones.
- `LAYOUT` sets the order of spaces on the board.

Board codes: `S` scripture, `F` foundation, `C` choose, `X2` storm of strength 2, `V` service, `G` song, `B` Sabbath, `M:name` milestone.

See [SOURCES.md](SOURCES.md) for where every quotation comes from.
