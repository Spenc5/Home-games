# The Quest

A board game about the plan of salvation for children ages 6 to 10. It's for 1 to 4 players on one phone, tablet or computer, and reinforces what children have been taught.

The trail is a map of the handout *The Quest*. Players start in the premortal life, then walk earth life past the handout's 13 foundation landmarks, building a house on the rock as they go. Then they continue through the spirit world and the Resurrection to eternal life.

## Playing

Open `index.html` in a web browser. It's one file with nothing to install. The whole board fits on the screen. It plays like *Trouble*.

1. **Start menu.** Choose 1 to 4 players, type names, and tap **Play**. Each player has one piece.
2. **Premortal life.** The opening scene shows (with "I Lived in Heaven"). Tap **Start the journey**.
3. **Premortal Life circle.** Everyone starts here. Tap **Pop!** to roll the die. You need a **1 or 6** to be born onto earth. **Pop a 6 any time and you go again.**
4. **Move** by tapping your own piece (or the glowing space, or **Hop**) one space at a time.
5. **Go around the board.** The loop is earth life: Born, Baptism, Jesus Christ Our Savior, and the **13 landmarks** from the handout, in its order. At each landmark, win a quick challenge (pick the missing word, or make a choice) to add it to your house on the rock (+2 ★).
6. **Finish lane.** After one loop, head through the **Spirit World** and the **Resurrection** toward the center. To enter the **Celestial Kingdom**, win a challenge. You don't need an exact roll. If you miss, try again next turn.

| Space | What happens |
|---|---|
| Landing on someone | **Team challenge.** Work it out together: +2 ★ each if right, +1 ★ each for trying. |
| Scripture | Pick the missing word in a verse. +2 ★ if right, +1 ★ for trying. |
| Choose | A modern situation or a scripture story. Right the first time: +3 ★ and **jump ahead 2**, and you win back a landmark you missed. |
| Storm | If your landmarks earned (+1 Holy Ghost after baptism) are at least the storm's number, your house stands: +2 ★. If not, **slide back 3**. |
| Service | Pick another player. You **both move ahead 1**. |
| Song | Sing a Primary song together: +2 ★. |
| Sabbath | +2 ★ for landing on it, +1 ★ for passing it. |

7. **Winning.** Arrival bonuses: first +5 ★, second +3, third +2, fourth +1. When everyone is in the Celestial Kingdom, **score = blessings + 2 for each landmark earned + 1 for each storm overcome.** Highest score wins.

Every card has a **Read aloud** button. A game in progress is saved on the device.

## Changing the pictures

Every picture has a slot name. To change one for everyone, put a picture in `images/` named after the slot, for example `images/baptism.jpg`. To change one only on a single device, tap **Pictures** in the game and upload or paste a link.

| Slot | Picture |
|---|---|
| `premortal` | The opening Premortal Life scene |
| `birth`, `baptism`, `savior`, `spiritworld`, `resurrection`, `home` | Milestones (`home` is the Celestial Kingdom) |
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
