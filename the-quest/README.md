# The Quest

A board game about the plan of salvation for children ages 6 to 10. It's for 1 to 4 players on one phone, tablet or computer, and reinforces what children have been taught.

The trail is a map of the handout *The Quest*. Players start in the premortal life, then walk earth life past the handout's 13 foundation landmarks, building a house on the rock as they go. Then they continue through the spirit world and the Resurrection to eternal life.

## Playing

Open `index.html` in a web browser. It's one file with nothing to install. The whole board fits on the screen.

1. **Start menu.** Choose 1 to 4 players, type names, and tap **Play**. Each player has one piece.
2. **Premortal life.** The opening scene shows (with "I Lived in Heaven"). Tap **Start the journey**.
3. **Born on earth.** Everyone starts in the Premortal Life circle with the Christus. Tap **Pop!** to roll the die. You need a **1 or 6** to be born. Pop a 6 any time and you go again.
4. **Go around the board** as many times as you need, tapping your piece one hop at a time. To leave earth you need:
   - **All 4 ordinances**, in order: Baptism and Confirmation, Sacrament, Temple Endowment, Temple Sealing. Land on or pass a gold **Ordinance** space to receive the next one you need (one per turn).
   - **A foundation of 6 stones.** Win the challenge on a brown foundation space (the ideas from the handout: prayer, scriptures, tithing, service and more) or a green Choose space.
5. **Daily repentance.** Teal **Repent** spaces are all around the board. Storms can knock a stone loose; landing on Repent puts it back. Miss a challenge? Repent and try again.
6. **Death and the lane.** With all 4 ordinances and 6 stones, turn off at **Death** onto the lane into the **Spirit World**. Wait there; on your turns, help players still on earth (win a challenge and they get a stone).
7. **The end.** When everyone is in the Spirit World, all are resurrected together and enter the **Celestial Kingdom** in the center. The Terrestrial and Telestial kingdoms are shown beside it.

| Space | What happens |
|---|---|
| Ordinance (gold) | Receive your next ordinance (+3 ★). |
| Foundation (brown) | A challenge about one of the handout's ideas. Win a stone (+1 ★). |
| Repent (teal) | Put back a loose stone, or get +2 ★. |
| Choose (green) | A modern situation or scripture story. Right the first time: +3 ★, a stone, and jump ahead. |
| Scripture (blue) | Pick the missing word. +2 ★. |
| Storm | If your stones (+1 Holy Ghost) are at least the storm's number, your house stands (+2 ★). If not, a stone comes loose. |
| Landing on someone | **Team challenge.** Work it out together: +2 ★ each if right. |
| Service, Song, Sabbath | Move ahead with a friend, sing a Primary song, or collect ★. |

Sometimes a win is a surprise trip to the next Ordinance space. **Score = blessings + 2 for each stone + 1 for each storm overcome.** First into the Spirit World gets +5 ★, second +3, third +2, fourth +1.

Every card has a **Read aloud** button. A game in progress is saved on the device.

## Changing the pictures

Every picture has a slot name. To change one for everyone, put a picture in `images/` named after the slot, for example `images/baptism.jpg`. To change one only on a single device, tap **Pictures** in the game and upload or paste a link.

| Slot | Picture |
|---|---|
| `premortal` | The opening Premortal Life scene |
| `birth`, `death`, `baptism`, `sabbath` (Sacrament), `temple` (Temple Endowment), `sealing`, `spiritworld`, `resurrection`, `home` | Milestones and ordinances (`home` is the Celestial Kingdom) |
| `christus` | The Christus in the Premortal Life circle |
| `stone1` … `stone13` | Landmarks 1–13 (landmark 8 uses `temple`) |
| `temple` | Landmark 8, Go to the temple |
| `rock` | Default picture for any landmark without its own |
| `storm`, `scripture`, `choose`, `story`, `service`, `song`, `sabbath` | Card pictures |

Find pictures in the Church [Media Library](https://www.churchofjesuschrist.org/media/images?lang=eng) and the [Gospel Art Book](https://www.churchofjesuschrist.org/media/collection/gospel-art-book-images?lang=eng). Church images may be used for non-commercial family and Church use. Check each image's usage notes.

## Changing the content

Everything is near the top of the script in `index.html`:

- `STONES` holds the 13 landmarks and their scriptures.
- `SCRIPTURES` holds the finish-the-verse cards.
- `CHOICES` holds the modern situations and scripture stories.
- `STORMS` holds the storms.
- `SONGS` holds the Primary songs.
- `MILES` holds the milestones.
- `LAYOUT` sets the order of the trail.

See [SOURCES.md](SOURCES.md) for where every quotation comes from.
