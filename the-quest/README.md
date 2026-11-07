# The Quest

A board game about the plan of salvation for children ages 6 to 10. It's for 1 to 4 players on one phone, tablet or computer, and reinforces what children have been taught.

The trail is a map of the handout *The Quest*. Players start in the premortal life, then walk earth life past the handout's 13 foundation landmarks, building a house on the rock as they go. Then they continue through the spirit world and the Resurrection to eternal life.

## Playing

Open `index.html` in a web browser. It's one file with nothing to install.

1. **Premortal life.** Choose 1 to 4 players. The game opens in the premortal life, then the Council in Heaven.
2. **Spin** (1 to 8) and follow the trail.
3. **Landmarks (1–13)** are the foundation from the handout, in its order:
   1. Daily scripture study
   2. Daily prayer and revelation
   3. Repent daily
   4. Share your testimony
   5. Take the sacrament worthily
   6. Treat your body like a temple
   7. Solve problems with the Lord's help
   8. Go to the temple
   9. Manage your feelings
   10. Use time wisely
   11. Pay tithing
   12. Be grateful
   13. Serve others

   Everyone stops at every landmark and takes its challenge: either finish its scripture, or a Choose the Right card about it. Pass the challenge to add that stone to your house's foundation (+2 ★). Then keep moving with any spaces left.
4. **Milestones** pause your move so you can read them: Born on Earth, Baptism and the Holy Ghost, Jesus Christ Our Savior, the Spirit World and the Resurrection.
5. **Spaces between landmarks:**

| Space | What happens |
|---|---|
| Scripture | Finish a verse by picking the missing word. +2 ★ if right, +1 ★ for reading it together. |
| Choose the Right | A modern situation or a scripture story (Nephi, Daniel, Ammon, Joseph, the grateful leper, the widow's mites, Abinadi). Right the first time: +3 ★, and you win back a landmark stone you missed. You can choose again for +1 ★. |
| Storm | Pride, anger, jealousy, fear, greed, hatred or arrogance. If your stones are at least the storm's strength, your house stands (+2 ★). After baptism, the Holy Ghost adds 1. If not, you lose 2 ★. Storms get stronger later in life. |
| Service | Choose another player to help. You both get +1 ★. |
| Song | Sing or hum a Primary song together: +2 ★. |
| Sabbath | +2 ★ for landing on it, +1 ★ for passing it. |

6. **Home.** Arrival bonuses: first +5 ★, second +3, third +2, fourth +1. When everyone is home, **score = blessings + 2 for each stone + 1 for each storm overcome.** Highest score wins.

Every card has a **Read aloud** button. A game in progress is saved on the device.

## Changing the pictures

Every picture has a slot name. To change one for everyone, put a picture in `images/` named after the slot, for example `images/baptism.jpg`. To change one only on a single device, tap **Pictures** in the game and upload or paste a link.

| Slot | Picture |
|---|---|
| `premortal`, `council`, `birth`, `baptism`, `savior`, `spiritworld`, `resurrection`, `home` | Milestones |
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
