// Tagged exercise library. The workout assembler picks an exercise per movement pattern
// based on the client's intake (equipment, current injuries, experience, age).
//
// Schema:
//   id              unique slug
//   name            display name
//   pattern         one of: squat, hinge, lunge, horizontal-push, vertical-push,
//                   horizontal-pull, vertical-pull, core, carry, finisher
//   equipment       array — exercise can be done if any of these match intake.equipment
//   contraindications  array of injury area slugs — exercise excluded if intake has any
//   experienceMin   integer 0–4 (none/lt1/1to3/3to5/5plus)
//   highImpact      true → excluded for clients age ≥ 60
//   defaultRank     lower = preferred when multiple candidates qualify (0 = the heavy
//                   compound default for that pattern)
//   repCue          short rep-format note (each leg / hold / AMRAP / etc.) — optional
//   howTo           array of 4 step-by-step instructions shown when the exercise is
//                   expanded on the dashboard

export const EXERCISES = [
  // ── Squat ───────────────────────────────────────────────
  { id: 'back_squat', name: 'Back Squat', pattern: 'squat', equipment: ['full_gym','home_gym'], contraindications: ['lower_back','knee','hip'], experienceMin: 2, highImpact: false, defaultRank: 0, repCue: 'reset every set',
    howTo: [
      'Bar high on traps, feet shoulder-width, toes turned out 5–15°.',
      'Brace core, take a big breath into your belly.',
      'Sit back and down, knees tracking over toes, depth at or below parallel.',
      'Drive through mid-foot, hips and chest rise together to full lockout.',
    ] },
  { id: 'front_squat', name: 'Front Squat', pattern: 'squat', equipment: ['full_gym','home_gym'], contraindications: ['knee','wrist'], experienceMin: 3, highImpact: false, defaultRank: 1,
    howTo: [
      'Bar across front delts, fingertips loosely under, elbows up high.',
      'Brace and inhale; keep torso vertical the whole rep.',
      'Sit straight down between your feet — knees track toes.',
      'Drive up keeping elbows pointed forward; full lockout.',
    ] },
  { id: 'goblet_squat', name: 'Goblet Squat', pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 2,
    howTo: [
      'Hold a dumbbell vertically at your chest, elbows tucked under it.',
      'Feet slightly wider than shoulders, toes turned out ~15°.',
      'Sit between your heels until elbows pass inside your knees.',
      'Stand tall driving through mid-foot, exhale at the top.',
    ] },
  { id: 'leg_press', name: 'Leg Press', pattern: 'squat', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3,
    howTo: [
      'Sit deep into the seat, lower back fully against the pad.',
      'Feet shoulder-width on the platform, mid-foot pressure.',
      'Lower the platform until knees reach ~90°; don\'t let your hips lift off the seat.',
      'Drive through mid-foot back up; do not lock the knees out hard.',
    ] },
  { id: 'bulgarian_split', name: 'Bulgarian Split Squat', pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip'], experienceMin: 1, highImpact: false, defaultRank: 4, repCue: 'each leg',
    howTo: [
      'Front foot 2–3 ft from a bench, rear foot laces-down on the bench.',
      'Torso slightly forward, weight in the front mid-foot.',
      'Drop straight down — front knee tracks toes, rear knee 1" off the floor.',
      'Drive through the front mid-foot to stand; complete reps then switch.',
    ] },
  { id: 'box_step_up', name: 'Box Step-Up', pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 5, repCue: 'each leg',
    howTo: [
      'Box at roughly knee-height; place your full foot on top.',
      'Lean torso slightly forward over the working leg.',
      'Drive through the heel of the working leg; stand tall on top.',
      'Step down under control with the same leg; alternate or do all reps one side.',
    ] },
  { id: 'bw_squat', name: 'Bodyweight Squat', pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 6,
    howTo: [
      'Feet shoulder-width, toes slightly out, arms forward as a counterweight.',
      'Sit back as if to a chair; chest up, weight in mid-foot.',
      'Descend to a depth that feels strong (parallel is the goal over time).',
      'Drive through mid-foot to stand; squeeze glutes at the top.',
    ] },

  // ── Hinge ───────────────────────────────────────────────
  { id: 'deadlift', name: 'Conventional Deadlift', pattern: 'hinge', equipment: ['full_gym','home_gym'], contraindications: ['lower_back','knee'], experienceMin: 2, highImpact: false, defaultRank: 0, repCue: 'reset every rep',
    howTo: [
      'Bar over mid-foot; shins almost touching the bar.',
      'Hinge to grip — hips between shoulders and knees, neutral spine.',
      'Pull slack out of the bar, big breath, brace.',
      'Drive the floor away; bar slides up your legs to a tall lockout.',
    ] },
  { id: 'hex_bar_dl', name: 'Trap-Bar Deadlift', pattern: 'hinge', equipment: ['full_gym'], contraindications: ['lower_back'], experienceMin: 1, highImpact: false, defaultRank: 1,
    howTo: [
      'Stand inside the trap bar, feet hip-width.',
      'Squat-hinge to the handles — chest up, neutral spine.',
      'Drive through the floor and stand tall; lock hips at the top.',
      'Reverse the motion under control; reset between reps.',
    ] },
  { id: 'rdl', name: 'Romanian Deadlift', pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['lower_back'], experienceMin: 1, highImpact: false, defaultRank: 2,
    howTo: [
      'Soft knee bend, bar (or DBs) at thigh, neutral spine.',
      'Push hips back; bar slides down close to your legs.',
      'Stop just below the knees when you feel the hamstring stretch.',
      'Drive hips forward to stand; squeeze glutes at lockout.',
    ] },
  { id: 'single_leg_rdl', name: 'Single-Leg RDL', pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['hip'], experienceMin: 2, highImpact: false, defaultRank: 3, repCue: 'each leg',
    howTo: [
      'Stand on one leg with a slight bend in the standing knee.',
      'Hinge at the hip; the free leg traces straight back behind you.',
      'Hand or DB reaches toward the standing foot, hips square to the floor.',
      'Drive the standing hip forward to return; switch sides.',
    ] },
  { id: 'kb_swing', name: 'Kettlebell Swing', pattern: 'hinge', equipment: ['full_gym','home_gym'], contraindications: ['lower_back'], experienceMin: 1, highImpact: true, defaultRank: 4,
    howTo: [
      'KB on the floor between your feet; hinge and grip with both hands.',
      'Hike the KB back between your thighs.',
      'Pop your hips forward explosively — the KB floats to chest height.',
      'Let it fall back into the hinge; absorb and repeat.',
    ] },
  { id: 'hip_thrust', name: 'Hip Thrust', pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 5,
    howTo: [
      'Upper back on a bench, feet flat hip-width, weight across your hips.',
      'Tuck your chin and brace your core hard.',
      'Drive heels through the floor; lift hips to a flat-table position.',
      'Squeeze the glutes hard at the top; lower with control.',
    ] },
  { id: 'glute_bridge', name: 'Glute Bridge', pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 6,
    howTo: [
      'Lie on your back, feet flat hip-width, heels close to glutes.',
      'Brace the core; press your low back gently into the floor.',
      'Drive heels into the floor and lift hips until knees-hips-shoulders form a line.',
      'Squeeze the glutes at the top; lower with control.',
    ] },

  // ── Lunge ───────────────────────────────────────────────
  { id: 'walking_lunge', name: 'Walking Lunge', pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip','ankle'], experienceMin: 1, highImpact: false, defaultRank: 0, repCue: 'each leg',
    howTo: [
      'Step forward into a lunge — front shin vertical, back leg long.',
      'Lower the back knee toward the floor (1" off).',
      'Drive through the front mid-foot into the next step.',
      'Alternate legs each step; chest stays tall.',
    ] },
  { id: 'reverse_lunge', name: 'Reverse Lunge', pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['hip'], experienceMin: 0, highImpact: false, defaultRank: 1, repCue: 'each leg',
    howTo: [
      'Step one foot straight back into a long stride.',
      'Lower the back knee toward the floor; front shin vertical.',
      'Drive through the front mid-foot to stand.',
      'Step back to start; alternate legs each rep.',
    ] },
  { id: 'lateral_lunge', name: 'Lateral Lunge', pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip'], experienceMin: 1, highImpact: false, defaultRank: 2, repCue: 'each side',
    howTo: [
      'Step wide to one side; push hips back and load that leg.',
      'Bent knee tracks over toes; opposite leg stays straight.',
      'Drop your chest toward the bent thigh.',
      'Drive through the working heel back to start; switch sides.',
    ] },
  { id: 'split_squat', name: 'Static Split Squat', pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip'], experienceMin: 0, highImpact: false, defaultRank: 3, repCue: 'each leg',
    howTo: [
      'Stagger your stance: front foot flat, rear foot on the toes.',
      'Drop straight down — both knees bend, front knee tracks toes.',
      'Rear knee an inch off the floor at the bottom.',
      'Drive through the front mid-foot up; complete reps then switch.',
    ] },
  { id: 'curtsy_lunge', name: 'Curtsy Lunge', pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee'], experienceMin: 1, highImpact: false, defaultRank: 4, repCue: 'each side',
    howTo: [
      'Stand tall; cross one leg behind and to the opposite side.',
      'Lower into a curtsy — front knee tracks over toes.',
      'Drive through the front heel to stand; uncross to start.',
      'Alternate sides; keep hips square to the front.',
    ] },

  // ── Horizontal Push ─────────────────────────────────────
  { id: 'bench_press', name: 'Barbell Bench Press', pattern: 'horizontal-push', equipment: ['full_gym','home_gym'], contraindications: ['shoulder','wrist','elbow'], experienceMin: 2, highImpact: false, defaultRank: 0,
    howTo: [
      'Lie flat with feet planted, slight upper-back arch, shoulder blades pinned.',
      'Grip just outside shoulder-width; brace lats hard.',
      'Lower the bar to your lower chest under control, elbows tucked ~45°.',
      'Drive the bar up and slightly back to lockout.',
    ] },
  { id: 'incline_db_press', name: 'Incline DB Press', pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['shoulder'], experienceMin: 1, highImpact: false, defaultRank: 1,
    howTo: [
      'Set the bench to 30–45° incline; sit with feet planted.',
      'DBs at chest level, palms forward, elbows ~45° to body.',
      'Press the DBs up and slightly together until they meet over your chest.',
      'Lower with control to a deep stretch at the bottom.',
    ] },
  { id: 'flat_db_press', name: 'Flat DB Press', pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['shoulder'], experienceMin: 0, highImpact: false, defaultRank: 2,
    howTo: [
      'Lie flat on a bench, DBs at chest, elbows ~45° to body.',
      'Press the DBs up and slightly together at lockout.',
      'Avoid clanging them at the top — finish controlled.',
      'Lower under control to a deep stretch in the chest.',
    ] },
  { id: 'machine_chest_press', name: 'Machine Chest Press', pattern: 'horizontal-push', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3,
    howTo: [
      'Adjust seat so the handles align with mid-chest.',
      'Press the handles out and slightly together.',
      'Stop short of locking the elbows hard.',
      'Return slowly — full stretch at the bottom.',
    ] },
  { id: 'push_up', name: 'Push-Up', pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['wrist','elbow'], experienceMin: 0, highImpact: false, defaultRank: 4,
    howTo: [
      'Hands shoulder-width, body in a straight line head-to-heels.',
      'Brace core and squeeze glutes; elbows tuck ~45° to ribs.',
      'Lower chest to within an inch of the floor.',
      'Push back to a tall plank; do not let hips sag.',
    ] },
  { id: 'incline_push_up', name: 'Incline Push-Up', pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 5,
    howTo: [
      'Place hands on a sturdy bench or bar; body in a straight line.',
      'Same form as a push-up — lower chest to the surface.',
      'The higher the surface, the easier the lift.',
      'Drive back to start; keep glutes squeezed throughout.',
    ] },
  { id: 'dip', name: 'Triceps Dip', pattern: 'horizontal-push', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','elbow'], experienceMin: 2, highImpact: false, defaultRank: 6,
    howTo: [
      'Grip parallel bars; press up to a fully locked-out start.',
      'Lean torso slightly forward (chest emphasis).',
      'Lower until shoulders pass the elbows under control.',
      'Drive back up; lock the elbows softly at the top.',
    ] },

  // ── Vertical Push ───────────────────────────────────────
  { id: 'overhead_press', name: 'Standing Overhead Press', pattern: 'vertical-push', equipment: ['full_gym','home_gym'], contraindications: ['shoulder','lower_back'], experienceMin: 2, highImpact: false, defaultRank: 0,
    howTo: [
      'Bar at front delts, elbows just under the bar, grip outside shoulders.',
      'Brace core; squeeze glutes; pull the head out of the way.',
      'Press the bar straight up; lock out overhead.',
      'Pull head through at the top — bar over mid-foot.',
    ] },
  { id: 'seated_db_press', name: 'Seated DB Shoulder Press', pattern: 'vertical-push', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['shoulder'], experienceMin: 1, highImpact: false, defaultRank: 1,
    howTo: [
      'Sit upright on a bench with back support if available.',
      'DBs at shoulder height, palms forward.',
      'Press up and slightly inward; lock out fully overhead.',
      'Lower with control; full stretch at the bottom.',
    ] },
  { id: 'machine_shoulder', name: 'Machine Shoulder Press', pattern: 'vertical-push', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 2,
    howTo: [
      'Adjust seat so the handles line up with mid-shoulders.',
      'Press up and slightly inward following the machine\'s arc.',
      'Avoid hyperextending the elbows.',
      'Lower under control back to start.',
    ] },
  { id: 'landmine_press', name: 'Landmine Press', pattern: 'vertical-push', equipment: ['full_gym','home_gym'], contraindications: [], experienceMin: 1, highImpact: false, defaultRank: 3, repCue: 'each side',
    howTo: [
      'Stagger stance — opposite hand and foot forward.',
      'Bar end in your shoulder pocket, palm in.',
      'Press up and across to full extension overhead.',
      'Lower with control; switch sides after reps.',
    ] },
  { id: 'pike_push_up', name: 'Pike Push-Up', pattern: 'vertical-push', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','wrist'], experienceMin: 1, highImpact: false, defaultRank: 4,
    howTo: [
      'Hands shoulder-width on the floor; pike hips high (downward dog).',
      'Lower the head between your hands, elbows back and slightly out.',
      'Push back to start, driving vertically through the shoulders.',
      'Walk feet closer to hands to make it harder.',
    ] },

  // ── Horizontal Pull ─────────────────────────────────────
  { id: 'barbell_row', name: 'Bent-Over Barbell Row', pattern: 'horizontal-pull', equipment: ['full_gym','home_gym'], contraindications: ['lower_back'], experienceMin: 2, highImpact: false, defaultRank: 0,
    howTo: [
      'Hinge with bar at hip, soft knees, neutral spine.',
      'Pull the bar to your lower sternum.',
      'Squeeze shoulder blades together at the top.',
      'Lower with control; no torso bouncing.',
    ] },
  { id: 'chest_supp_row', name: 'Chest-Supported Row', pattern: 'horizontal-pull', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 1,
    howTo: [
      'Set the chest pad slightly above the elbow line.',
      'DBs hanging straight down, neutral grip.',
      'Pull the DBs to your lower ribs; squeeze shoulder blades.',
      'Hold a beat; lower with control to a full stretch.',
    ] },
  { id: 'one_arm_db_row', name: 'One-Arm DB Row', pattern: 'horizontal-pull', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 2, repCue: 'each side',
    howTo: [
      'One knee + same-side hand on a bench, opposite foot planted.',
      'DB starts straight down with a neutral grip.',
      'Row the DB to your hip; drive elbow up and back.',
      'Lower under control; complete reps and switch sides.',
    ] },
  { id: 'cable_row', name: 'Seated Cable Row', pattern: 'horizontal-pull', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3,
    howTo: [
      'Sit tall with knees soft, lean torso slightly back.',
      'Pull the handle to your lower ribs.',
      'Squeeze shoulder blades together hard.',
      'Return with stretch but without rounding the low back.',
    ] },
  { id: 't_bar_row', name: 'T-Bar Row', pattern: 'horizontal-pull', equipment: ['full_gym'], contraindications: ['lower_back'], experienceMin: 2, highImpact: false, defaultRank: 4,
    howTo: [
      'Straddle the bar, hinge with neutral spine, soft knees.',
      'Grip the handles, pull the bar to your lower chest.',
      'Squeeze shoulder blades; pause briefly.',
      'Control the lower; do not bounce off the floor.',
    ] },
  { id: 'inverted_row', name: 'Inverted Row', pattern: 'horizontal-pull', equipment: ['full_gym','home_gym','bodyweight'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 5,
    howTo: [
      'Bar at hip-height; hang underneath with body in a straight line.',
      'Pull your chest to the bar; keep glutes squeezed.',
      'Squeeze shoulder blades at the top.',
      'Lower under control; the higher the bar the easier the lift.',
    ] },
  { id: 'face_pull', name: 'Face Pull', pattern: 'horizontal-pull', equipment: ['full_gym','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 6,
    howTo: [
      'Set cable at face height; rope grip with palms in.',
      'Pull the rope toward your face; keep elbows high.',
      'Externally rotate at the end — like a double-bicep flex.',
      'Slow return; no jerking the weight back.',
    ] },

  // ── Vertical Pull ───────────────────────────────────────
  { id: 'pull_up', name: 'Pull-Up', pattern: 'vertical-pull', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','elbow'], experienceMin: 2, highImpact: false, defaultRank: 0,
    howTo: [
      'Dead hang from the bar, palms forward, full extension.',
      'Drive your elbows down and back; lead with your chest.',
      'Pull until your chin clears the bar.',
      'Lower under control to a full hang; reset before next rep.',
    ] },
  { id: 'chin_up', name: 'Chin-Up', pattern: 'vertical-pull', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','elbow'], experienceMin: 1, highImpact: false, defaultRank: 1,
    howTo: [
      'Dead hang, palms toward you, full extension.',
      'Drive elbows down toward your ribs.',
      'Pull until your chin clears the bar.',
      'Lower under control to a full hang.',
    ] },
  { id: 'lat_pulldown', name: 'Lat Pulldown', pattern: 'vertical-pull', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 2,
    howTo: [
      'Adjust the thigh pad snug; lean torso slightly back.',
      'Pull the bar to your upper chest.',
      'Squeeze the lats hard; hold a beat.',
      'Return slowly to a full stretch overhead.',
    ] },
  { id: 'neutral_pulldown', name: 'Neutral-Grip Pulldown', pattern: 'vertical-pull', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3,
    howTo: [
      'Same as a lat pulldown but with parallel handles, palms facing each other.',
      'Easier on sensitive shoulders.',
      'Drive your elbows toward your ribs.',
      'Slow return to a full stretch overhead.',
    ] },
  { id: 'banded_pulldown', name: 'Banded Pulldown', pattern: 'vertical-pull', equipment: ['bands','bodyweight'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 4,
    howTo: [
      'Anchor a long band overhead (door, beam, sturdy pull-up bar).',
      'Kneel or sit; grip the band with both hands.',
      'Pull the band down toward your ribs.',
      'Squeeze the lats; slow return to start.',
    ] },

  // ── Core ────────────────────────────────────────────────
  { id: 'plank', name: 'Plank', pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['shoulder','wrist'], experienceMin: 0, highImpact: false, defaultRank: 0, repCue: 'hold seconds',
    howTo: [
      'Forearms or hands shoulder-width; elbows under shoulders.',
      'Body in a straight line head-to-heels; glutes squeezed.',
      'Brace your core like blocking a punch.',
      'Hold for the prescribed time; breathe shallow and steady.',
    ] },
  { id: 'side_plank', name: 'Side Plank', pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['shoulder','wrist'], experienceMin: 0, highImpact: false, defaultRank: 1, repCue: 'each side',
    howTo: [
      'Forearm down, elbow under shoulder, body stacked on one side.',
      'Lift hips off the floor; body in a straight line.',
      'Top hand on hip or reaching up.',
      'Hold for time; switch sides; do not let hips sag.',
    ] },
  { id: 'hollow_hold', name: 'Hollow Hold', pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['lower_back','neck'], experienceMin: 1, highImpact: false, defaultRank: 2,
    howTo: [
      'Lie on your back; press your low back into the floor.',
      'Lift legs and shoulders off the floor; arms reach overhead.',
      'Hold the contact between low back and floor the entire time.',
      'Breathe shallow; reduce range if your back lifts.',
    ] },
  { id: 'dead_bug', name: 'Dead Bug', pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3,
    howTo: [
      'Lie on your back; arms reach to the ceiling, knees bent 90°.',
      'Lower opposite arm and leg slowly toward the floor.',
      'Keep your low back pressed into the floor the entire time.',
      'Return to start; switch sides each rep.',
    ] },
  { id: 'hanging_leg_raise', name: 'Hanging Leg Raise', pattern: 'core', equipment: ['full_gym','home_gym'], contraindications: ['shoulder','lower_back'], experienceMin: 2, highImpact: false, defaultRank: 4,
    howTo: [
      'Hang from a pull-up bar with arms straight; engage lats.',
      'Brace your core; raise your legs to parallel or higher.',
      'Lower under control — no swinging.',
      'Toes pointed throughout for cleaner mechanics.',
    ] },
  { id: 'cable_crunch', name: 'Cable Crunch', pattern: 'core', equipment: ['full_gym'], contraindications: ['neck'], experienceMin: 0, highImpact: false, defaultRank: 5,
    howTo: [
      'Kneel facing the cable; rope at your temples.',
      'Crunch your elbows toward your thighs — round the spine.',
      'Squeeze the abs hard at the bottom.',
      'Return slow; the hips stay anchored, not the hip flexors.',
    ] },
  { id: 'pallof_press', name: 'Pallof Press', pattern: 'core', equipment: ['full_gym','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 6, repCue: 'each side',
    howTo: [
      'Cable or band at chest height; stand side-on to the anchor.',
      'Hands at chest; press the handle straight out.',
      'Resist any rotation pulling you sideways — that\'s the work.',
      'Return slow; complete reps and switch sides.',
    ] },
  { id: 'ab_wheel', name: 'Ab Wheel Rollout', pattern: 'core', equipment: ['full_gym','home_gym'], contraindications: ['lower_back','shoulder'], experienceMin: 2, highImpact: false, defaultRank: 7,
    howTo: [
      'Kneel with hands on the wheel under your shoulders.',
      'Brace core and roll the wheel forward.',
      'Stop before the low back arches.',
      'Pull back to start; breathe in on the return.',
    ] },

  // ── Carry ───────────────────────────────────────────────
  { id: 'farmers_carry', name: 'Farmer\'s Carry', pattern: 'carry', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 0, repCue: 'distance or seconds',
    howTo: [
      'Pick up DBs/KBs with a strong hinge — neutral spine.',
      'Stand tall; ribs down, shoulders back.',
      'Walk normally for the prescribed distance/time.',
      'Set the weights down with a hinge; don\'t drop.',
    ] },
  { id: 'suitcase_carry', name: 'Suitcase Carry', pattern: 'carry', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['lower_back'], experienceMin: 0, highImpact: false, defaultRank: 1, repCue: 'each side',
    howTo: [
      'One DB/KB only — held on the opposite side of body.',
      'Brace your core hard to resist the side-bend pull.',
      'Walk for distance/time without leaning.',
      'Switch sides; matched reps each side.',
    ] },
  { id: 'sled_push', name: 'Sled Push', pattern: 'carry', equipment: ['full_gym'], contraindications: [], experienceMin: 1, highImpact: false, defaultRank: 2,
    howTo: [
      'Body angle ~45°; hands on the high or low handles.',
      'Drive hard through the hips and quads.',
      'Long strides; keep the core tight throughout.',
      'Walk slowly back as recovery between bouts.',
    ] },
  { id: 'sled_drag', name: 'Backwards Sled Drag', pattern: 'carry', equipment: ['full_gym'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3,
    howTo: [
      'Face away from the sled; long stride length.',
      'Walk backward, driving through your quads.',
      'Stay tall — don\'t round your back against the resistance.',
      'Excellent for knee health and quad volume.',
    ] },

  // ── Finisher (metabolic conditioning blocks for fat-loss) ─────────────
  { id: 'fin_kb_swings', name: 'KB Swing Intervals', pattern: 'finisher', equipment: ['full_gym','home_gym'], contraindications: ['lower_back'], experienceMin: 1, highImpact: true, defaultRank: 0, repCue: '8 rounds: 30s on / 30s off',
    howTo: [
      'KB on the floor between feet; hinge to grip with both hands.',
      'Pop the hips forward — KB floats to chest height.',
      '30 seconds of swings, then 30 seconds rest.',
      'Repeat for 8 rounds; reset breath each round.',
    ] },
  { id: 'fin_sled_intervals', name: 'Sled Push Intervals', pattern: 'finisher', equipment: ['full_gym'], contraindications: [], experienceMin: 1, highImpact: false, defaultRank: 1, repCue: '6 × 20m heavy',
    howTo: [
      'Load the sled heavy enough that 20m is hard but completable.',
      'Push 20m at full intent; walk slowly back.',
      'Repeat for 6 rounds.',
      'Aim for the same effort each round; full recovery between.',
    ] },
  { id: 'fin_jump_rope', name: 'Jump Rope Intervals', pattern: 'finisher', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['knee','ankle'], experienceMin: 0, highImpact: true, defaultRank: 2, repCue: '10 × 60s on / 30s off',
    howTo: [
      'Tight elbows at your sides; light bounces on the balls of the feet.',
      '60 seconds of skipping, then 30 seconds rest.',
      'Repeat for 10 rounds.',
      'Stay relaxed in the upper body; let the wrists do the work.',
    ] },
  { id: 'fin_bw_circuit', name: 'Bodyweight Circuit', pattern: 'finisher', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3, repCue: '3 rounds',
    howTo: [
      '3 rounds, no rest within a round.',
      'Round: 10 bodyweight squats, 10 push-ups, 10 inverted rows.',
      '60 seconds rest between rounds.',
      'Move smoothly through each — pace, don\'t sprint.',
    ] },
  { id: 'fin_burpee_emom', name: 'Burpee EMOM', pattern: 'finisher', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['knee','ankle','wrist'], experienceMin: 1, highImpact: true, defaultRank: 4, repCue: '8 min: 8 burpees per minute',
    howTo: [
      'Every Minute On the Minute (EMOM) for 8 minutes.',
      'Do 8 burpees as soon as the minute starts.',
      'Use the rest of the minute to recover.',
      'Smooth chest-to-floor; jump or step into the squat — your choice.',
    ] },
];

export const PATTERNS = [
  'squat', 'hinge', 'lunge',
  'horizontal-push', 'vertical-push',
  'horizontal-pull', 'vertical-pull',
  'core', 'carry', 'finisher',
];

// Map intake.experience → integer 0–4
export function experienceLevel(value) {
  switch (value) {
    case 'none': return 0;
    case 'lt1': return 1;
    case '1to3': return 2;
    case '3to5': return 3;
    case '5plus': return 4;
    default: return 1;
  }
}
