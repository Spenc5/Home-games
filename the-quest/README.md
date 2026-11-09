# The Quest

A board game about the plan of salvation for children ages 6 to 10. It's for 1 to 4 players on one phone, tablet or computer, and reinforces what children have been taught.

Players start in the premortal life, are born, and travel around earth life collecting the four ordinances and building a house on the rock from the ideas in the handout *The Quest*. Then they pass through death and the spirit world, and are resurrected together into the Celestial Kingdom.

## Playing

Open `index.html` in a web browser. It's one file with nothing to install. The whole board fits on the screen.

1. **Start menu.** Choose 1 to 4 players, type names, pick **Short** (4 stones) or **Long** (6 stones), and tap **Play**. Each player has one piece.
2. **Premortal life.** The opening scene shows (with "I Lived in Heaven"). Tap **Start the journey**.
3. **Born on earth.** Everyone starts in the Premortal Life circle. Tap **Pop!** to roll the die. You need a **1 or 6** to be born. Pop a 6 any time and you go again.
4. **Move your own piece.** Tap the glowing space (or your piece) once for each space and count out loud; a number pops up on each space. Go around the board as many times as you need. To leave earth you need:
   - **All 4 ordinances**, in order: Baptism and Confirmation, Sacrament, Temple Endowment, Temple Sealing. Land on a gold **Ordinance** space to receive the next one you need.
   - **A foundation of stones** (4 in a short game, 6 in a long one). Win the challenge on a brown foundation space (the ideas from the handout: prayer, scriptures, tithing, service and more) or a green Choose space.
5. **Daily repentance.** Teal **Repent** spaces are all around the board. Storms can knock a stone loose; landing on Repent puts it back. Miss a challenge? Repent and try again.
6. **The road home.** Death is not on the loop, so no one can land on it early. With all 4 ordinances and your stones, turn onto the **road home** at the signpost. It leads through **Death** into the **Spirit World**. Wait there; on your turns, help players still on earth (win a challenge and they get a stone).
7. **The Celestial Kingdom.** When everyone is in the Spirit World, keep popping and moving along the road (Scripture, Song, Risen). Win a challenge to enter the **Celestial Kingdom** in the center. The Terrestrial and Telestial kingdoms are shown beside it.

| Space | What happens |
|---|---|
| Ordinance (gold) | Receive your next ordinance (+3 ★). |
| Foundation (brown) | A *Friend* story or scripture about one of the handout's ideas. Win a stone (+1 ★). |
| Repent (teal) | Put back a loose stone, or get +2 ★. |
| Choose (green) | A kid situation from a true story in the *Friend* magazine, or a scripture story. Choose, then see what really happened. Right the first time: +3 ★, a stone, and jump ahead. |
| Scripture (blue) | Pick the missing word in a verse (+2 ★), or **something to do** from the *Friend*'s Come, Follow Me activities (+2 ★ when you do it). |
| Storm | If your stones (+1 Holy Ghost) are at least the storm's number, your house stands (+2 ★). If not, a stone comes loose. |
| Landing on someone | **Team challenge.** Work it out together: +2 ★ each if right. |
| Service, Song, Sabbath | Move ahead with a friend, sing a Primary song, or collect ★. |

Sometimes a win is a surprise trip to the next Ordinance space. **Score = blessings + 2 for each stone + 1 for each storm overcome.** First into the Celestial Kingdom gets +5 ★, second +3, third +2, fourth +1.

Every card has a **Read aloud** button. The game has sound effects (die pop, counting ticks, chimes, thunder for storms, fanfares for ordinances); turn them off with **Sound** at the top. A game in progress is saved on the device.

## Changing the pictures

Every picture has a slot name. To change one for everyone, put a picture in `images/` named after the slot, for example `images/baptism.jpg`. To change one only on a single device, tap **Pictures** in the game and upload or paste a link.

| Slot | Picture |
|---|---|
| `premortal` | The opening Premortal Life scene |
| `birth`, `death`, `baptism`, `sabbath` (Sacrament), `temple` (Temple Endowment), `sealing`, `spiritworld`, `resurrection`, `home` | Milestones and ordinances (`home` is the Celestial Kingdom) |
| `temple` | Landmark 8, Go to the temple |
| `rock` | Foundation cards (house on the rock) |
| `storm`, `scripture`, `choose`, `story`, `service`, `song`, `sabbath` | Card pictures |

Find pictures in the Church [Media Library](https://www.churchofjesuschrist.org/media/images?lang=eng) and the [Gospel Art Book](https://www.churchofjesuschrist.org/media/collection/gospel-art-book-images?lang=eng). Church images may be used for non-commercial family and Church use. Check each image's usage notes.

## Changing the content

Everything is near the top of the script in `index.html`:

- `STONES` holds the handout's ideas and their scriptures (used on foundation spaces).
- `ORDS` holds the four ordinances.
- `SCRIPTURES` holds the finish-the-verse cards.
- `CHOICES` holds the modern situations and scripture stories.
- `STORMS` holds the storms.
- `SONGS` holds the Primary songs.
- `MILES` holds the milestones.
- `LAYOUT` sets the order of the trail.

See [SOURCES.md](SOURCES.md) for where every quotation comes from.
