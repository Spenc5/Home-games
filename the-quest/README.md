# The Quest

A board game about the plan of salvation for children ages 6 to 10. It's for 1 to 4 players on one phone, tablet or computer, and reinforces what children have been taught.

The trail is a map of the handout *The Quest*. Players start in the premortal life, then walk earth life past the handout's 13 foundation landmarks, building a house on the rock as they go. Then they continue through the spirit world and the Resurrection to eternal life.

## Playing

Open `index.html` in a web browser. It's one file with nothing to install. The whole board fits on the screen.

1. **Start menu.** Choose 1 to 4 players, type names, and tap **Play**.
2. **Premortal life.** "I Lived in Heaven" plays while the opening scene shows. Tap **Start the journey** to go to the board.
3. **Getting born.** Everyone starts in the Premortal Life corner. Like *Sorry!*, you must spin a **1 or 2** to be born onto earth.
4. **Your turn.** Tap **Spin** (1 to 8), then **tap your own piece** (or the glowing space, or **Hop**) to move one space at a time.
5. **Landmarks 1–13** are the foundation from the handout, in its order. Everyone stops at each one for a quick challenge: pick a missing word, or make a choice. Win it to add that stone to your house on the rock (+2 ★). Then keep hopping.
6. **Milestones** (Born, Baptism, Savior, Spirit World, Risen) pause you for a moment. Baptism gives the Holy Ghost: +1 in every storm.

| Space | What happens |
|---|---|
| Scripture | Pick the missing word in a verse. +2 ★ if right, +1 ★ for trying. |
| Choose | A modern situation or a scripture story. Right the first time: +3 ★ and **jump ahead 2**, and you win back a landmark stone you missed. |
| Storm | If your stones (+1 Holy Ghost) are at least the storm's number, your house stands: +2 ★. If not, **slide back 3**. |
| Rainbow bridge | Land here with enough stones (4 or 8) to **cross over the next storm**. |
| Service | Pick another player. You **both move ahead 1**. |
| Song | Sing a Primary song together: +2 ★. |
| Sabbath | +2 ★ for landing on it, +1 ★ for passing it. |

7. **Home.** Arrival bonuses: first +5 ★, second +3, third +2, fourth +1. When everyone is home, **score = blessings + 2 for each stone + 1 for each storm overcome.** Highest score wins.

Every card has a **Read aloud** button. A game in progress is saved on the device.

## Changing the pictures

Every picture has a slot name. To change one for everyone, put a picture in `images/` named after the slot, for example `images/baptism.jpg`. To change one only on a single device, tap **Pictures** in the game and upload or paste a link.

| Slot | Picture |
|---|---|
| `premortal` | The opening Premortal Life scene |
| `birth`, `baptism`, `savior`, `spiritworld`, `resurrection`, `home` | Milestones |
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
