# RatchetHax

Cheat Engine tables for the Ratchet & Clank Series, including several known prototype builds. Useful for cheating, speedrunning, modding, reverse engineering and everything in between.

Compatible with PCSX2 1.6.0, your mileage may vary on other versions.

**:construction: Cheat tables are currently a work-in-progress and may be unfinished, have missing sections or incorrect addresses :construction:**

These cheat tables are intended to be friendly for beginners, all listed addresses have dropdown menus to select supported values.

Issues and Pull Requests are welcome :thumbsup:
 
## :information_source: Features

This is an incomplete list of the values that are present throughout the various cheat tables.

* **Nanotech**
* **Bolts**
* **Gold Bolts**
* **Game Mode:** Associated with the overall game state and can be used to access the Debug Menu in all builds of _Ratchet & Clank (2002)_
* **Loaded Planet:** One of several values that stores the ID for the currently loaded planet
* **Player State**
  * **Animation State:** Ratchet's current state (standing, jumping, etc..)
  * **X Coordinate**
  * **Y Coordinate**
  * **Z Coordinate**
  * **X Tilt**
  * **Y Tilt**
  * **Heading:** The direction Ratchet is facing. Valid range is -Pi to +Pi
* **Currently Equipped Items**
  * **Equipped Weapon**
  * **Equipped Backpack**
  * **Equipped Headwear**
  * **Equipped Footwear**
* **Weapon Unlocks:** Unlock any weapon in the game
* **Gold Weapon Unlocks:** Upgrade any weapon to the gold variant
* **Gadget Unlocks:** Unlock any gadget in the game
* **Item Unlocks:** Unlock any item in the game
* **Galactic Map:** Unlock all planets immediately, or selectively assign planets to each slot in the Galactic Map
* **Weapon Ammo:** Set and freeze ammo for any weapon in the game
* **Debug Mode Button Sequence:** Counts the number of correct sequential button presses to enable debug mode / "cheats enabled" mode
* **Debug / Cheats Enabled Mode:** Toggle debug mode in non-retail builds of the game
* **Debug Functions:** Manually trigger functionality that is normally accessibly from the game's debug menu
  * **DRAW State:** Various options to draw debug information on-screen _(most of these options don't work without a devkit)_
  * **UPDATE State**
  * **MODE \> Control State**
  * **MODE \> Profile**
  * **MODE \> Bookmark Toggle**
  * **MODE \> Invincibility Toggle**
  * **MODE \> Draw Distance Toggle**
  * **MODE \> Collision State**
  * **MODE \> TV Mode State**
  * **MODE \> Screen State**
  * **MODE \> Scene State**
  * **MODE \> Segment Selected Index**
  * **MISC \> BattleCam Toggle**
  * **MISC \> Actuator Toggle**
  * **Debug Menu \> Selected Category Index**
  * **Debug Menu \> Selected Menu Index**
  * **WidgetText Debug Display:** For _Ratchet & Clank: UYA_ only
  * **Test Draw Debug Display:** For _Ratchet & Clank: UYA_ only
  * **Character Map:** For _Ratchet & Clank: UYA_ only
  * **Toggle Console Logging:** For _Ratchet & Clank: UYA_ only
  * **IGE Debug:** For _Ratchet & Clank: UYA_ only
 * **Gadgetron Vendor**
   * **Selected Item Index**
   * **Ammo/Weapon Buy Modal State**
   * **Ammo Purchase QTY**
   * **Current Marquee Text**
 * **Ratchet Speed & Momentum**
   * **X Jump Momentum**
   * **Y Jump Momentum**
   * **Jump Acceleration**
   * **Distance to Ground**
   * **Max momentum to store by running**
   * **Global Stored Momentum**
 * **Camera Rotation Speed**
 * **Current Controller Button Pressed (Joker Address)**
