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

## Printed version (black and white, for coloring)

The `print/` folder has a paper version of the game. Print it in black and white and let the kids color it.

| File | What it is | How to print |
|---|---|---|
| [`print/board.pdf`](print/board.pdf) | The board on 2 sheets (about 16 × 10½ inches together) | Print at **100% / actual size**. Trim sheet 1 along the dotted line, lay it over the gray strip on sheet 2, glue, then mount on cardboard. |
| [`print/cards.pdf`](print/cards.pdf) | 135 cards in one stack, 9 per sheet, all with the same back | Print **double-sided, flip on the long edge**, at 100%. Cut along the thin gray lines. |
| [`print/mats.pdf`](print/mats.pdf) | 4 player mats and 60 stone tokens | Print single-sided. Cut out. |

Use a die from another game (a Trouble Pop-O-Matic works great) and any game pieces.

**The cards** all go in one shuffled stack. They are a mix of:

- **Quizzes:** Choose the Right stories, missing-word scriptures and Covenant questions. Answers are printed upside down at the bottom.
- **Stories:** true stories from the *Friend*, with questions to talk about.
- **Think About It:** questions to share, many from the *Friend* and *Come, Follow Me*.
- **Something to Do:** share a testimony, say something kind, show how to calm down, sing and more.

Many cards are about baptism, the sacrament and the temple. There are no wrong answers on story, think and do cards: taking part earns the stone.

**Playing on paper.** The rules are the same as the app, with a few things done by hand:
- **Starting:** Start in the Premortal Life circle. Pop a **1 or 6** to move onto Born. Pop a 6 and go again.
- **Moving:** Count the spaces out loud as you move.
- **Card spaces:** The person to your left draws the matching card and reads it to you.
  - **Foundation, Choose and Scripture spaces:** Draw the top card. Do what it says; the card tells what you earn.
  - **Storm:** Compare your stones (+1 after Baptism and Confirmation) with the number on the space. Too weak? Set one stone aside until you land on **Repent**. Then show or tell how you could handle that storm.
  - **Song:** Sing or hum a Primary song together.
- **Ordinance spaces:** Check off the next ordinance on your mat, then draw a card.
- **Other spaces:** **Repent** puts back a loose stone (or ★★). **Sabbath** = ★★. **Service** = you and a friend each move ahead 1.
- **Blessings:** Mark ★ blessings as tally marks on your mat.
- **Landing on someone:** Draw a card and do it together. Both get ★★.
- **The road home:** With all 4 ordinances and your stones (4 short game, 6 long game), turn onto the **Road home** at the signpost. Wait in the **Spirit World**. On your turn, draw a card for someone still on earth; when you finish it, they take a stone.
- **The Celestial Kingdom:** When everyone is in the Spirit World, keep moving along the road. Draw a card and finish it to enter the **Celestial Kingdom**.
- **Winning:** Most points wins: blessings + 2 per stone + 1 per storm overcome. First in gets +5, then +3, +2, +1.

To rebuild the PDFs after changing the game (for example new cards in `index.html`), run `node print/build.js` (needs [Playwright](https://playwright.dev)).

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
