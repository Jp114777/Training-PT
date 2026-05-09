// 100-meal pool. Each meal is tagged with:
//   slot:      'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_bed'
//   goals:     subset of ['cut', 'bulk', 'recomp', 'maintain']
//   diet:      ['omnivore'] | ['vegetarian'] | ['vegan'] | ['pescatarian']
//   protein:   primary protein source (used to encourage variety)
//   macros:    p (protein g), c (carbs g), f (fat g), kcal — these balance ±10 kcal
//
// `buildWeek(kind, seedKey)` deterministically assembles a 7-day plan from this pool.
// Same seed → same week. The seed key includes the ISO-week number so plans rotate.

export const MEAL_POOL = [
  // ── Breakfasts ──────────────────────────────────────────────
  { id: 'b1',  slot: 'breakfast', dish: 'Egg White Scramble + Berries', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'eggs', ingredients: ['6 egg whites','2 whole eggs','1 cup mixed berries','1 slice sourdough'], macros: { p: 35, c: 38, f: 12, kcal: 400 }, prepMin: 8 },
  { id: 'b2',  slot: 'breakfast', dish: 'Protein Oats', goals: ['cut','bulk','recomp','maintain'], diet: ['omnivore'], protein: 'whey', ingredients: ['½ cup oats','1 scoop whey','1 tbsp peanut butter','½ banana'], macros: { p: 32, c: 48, f: 11, kcal: 420 }, prepMin: 5 },
  { id: 'b3',  slot: 'breakfast', dish: 'Greek Yogurt Parfait', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1.5 cups Greek yogurt','½ cup berries','¼ cup granola','1 tbsp walnuts'], macros: { p: 38, c: 45, f: 14, kcal: 460 }, prepMin: 3 },
  { id: 'b4',  slot: 'breakfast', dish: 'Veggie Omelet', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['3 eggs','mushrooms','spinach','feta','1 slice toast'], macros: { p: 32, c: 25, f: 18, kcal: 390 }, prepMin: 10 },
  { id: 'b5',  slot: 'breakfast', dish: 'Smoothie Bowl', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'whey', ingredients: ['1 scoop whey','½ cup berries','½ banana','1 tbsp chia','almond milk'], macros: { p: 30, c: 35, f: 9, kcal: 350 }, prepMin: 4 },
  { id: 'b6',  slot: 'breakfast', dish: 'Cottage Cheese Toast', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['2 slices Ezekiel bread','½ cup cottage cheese','tomato','everything seasoning'], macros: { p: 28, c: 38, f: 8, kcal: 340 }, prepMin: 5 },
  { id: 'b7',  slot: 'breakfast', dish: 'Avocado Toast + Eggs', goals: ['recomp','maintain','bulk'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['2 slices sourdough','½ avocado','3 eggs','chili flakes'], macros: { p: 30, c: 45, f: 22, kcal: 500 }, prepMin: 8 },
  { id: 'b8',  slot: 'breakfast', dish: 'Protein Pancakes', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'whey', ingredients: ['½ cup oats','1 scoop whey','1 egg','banana','1 tsp baking powder'], macros: { p: 35, c: 50, f: 8, kcal: 410 }, prepMin: 12 },
  { id: 'b9',  slot: 'breakfast', dish: 'Breakfast Burrito', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['3 eggs','tortilla','4 oz steak','breakfast potatoes','cheese'], macros: { p: 45, c: 70, f: 30, kcal: 730 }, prepMin: 15 },
  { id: 'b10', slot: 'breakfast', dish: 'Steak & Eggs', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['4 oz sirloin','3 eggs','hash browns','toast'], macros: { p: 48, c: 60, f: 28, kcal: 690 }, prepMin: 15 },
  { id: 'b11', slot: 'breakfast', dish: 'Bagel Sandwich', goals: ['bulk'], diet: ['omnivore'], protein: 'pork', ingredients: ['bagel','2 eggs','4 oz ham','cheese'], macros: { p: 40, c: 65, f: 22, kcal: 620 }, prepMin: 8 },
  { id: 'b12', slot: 'breakfast', dish: 'Veggie Egg Wrap', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['3 whole eggs','whole-wheat tortilla','spinach','salsa'], macros: { p: 30, c: 32, f: 16, kcal: 400 }, prepMin: 8 },
  { id: 'b13', slot: 'breakfast', dish: 'Protein French Toast', goals: ['bulk'], diet: ['omnivore'], protein: 'turkey', ingredients: ['3 slices bread','2 eggs','milk','maple syrup','4 oz turkey sausage'], macros: { p: 40, c: 75, f: 24, kcal: 680 }, prepMin: 12 },
  { id: 'b14', slot: 'breakfast', dish: 'Mass Oats', goals: ['bulk'], diet: ['vegetarian'], protein: 'whey', ingredients: ['1 cup oats','1 scoop whey','2 tbsp peanut butter','1 banana','1 cup whole milk'], macros: { p: 45, c: 90, f: 25, kcal: 770 }, prepMin: 5 },
  { id: 'b15', slot: 'breakfast', dish: 'Veggie Frittata', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['4 eggs','mushrooms','spinach','goat cheese'], macros: { p: 32, c: 12, f: 22, kcal: 380 }, prepMin: 18 },
  { id: 'b16', slot: 'breakfast', dish: 'Big Breakfast Plate', goals: ['bulk'], diet: ['omnivore'], protein: 'eggs', ingredients: ['4 eggs','4 oz bacon','1 bagel + cream cheese','orange juice'], macros: { p: 42, c: 75, f: 35, kcal: 790 }, prepMin: 12 },
  { id: 'b17', slot: 'breakfast', dish: 'Pancake Stack', goals: ['bulk'], diet: ['omnivore'], protein: 'turkey', ingredients: ['3 protein pancakes','maple syrup','4 oz turkey bacon'], macros: { p: 45, c: 80, f: 18, kcal: 670 }, prepMin: 15 },
  { id: 'b18', slot: 'breakfast', dish: 'Turkey Bacon Wrap', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'turkey', ingredients: ['whole-wheat tortilla','3 eggs','3 strips turkey bacon','spinach','salsa'], macros: { p: 38, c: 38, f: 18, kcal: 470 }, prepMin: 10 },
  { id: 'b19', slot: 'breakfast', dish: 'Egg White Omelet', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['6 egg whites','2 whole eggs','mushrooms','cheese','1 slice toast'], macros: { p: 38, c: 25, f: 16, kcal: 400 }, prepMin: 10 },
  { id: 'b20', slot: 'breakfast', dish: 'Power Eggs', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['4 eggs','2 cups spinach','feta','1 slice sourdough'], macros: { p: 36, c: 30, f: 22, kcal: 470 }, prepMin: 10 },
  { id: 'b21', slot: 'breakfast', dish: 'Smoothie XL', goals: ['bulk'], diet: ['vegetarian'], protein: 'whey', ingredients: ['2 scoops whey','banana','½ cup oats','2 tbsp peanut butter','1 cup whole milk'], macros: { p: 55, c: 75, f: 18, kcal: 690 }, prepMin: 3 },
  { id: 'b22', slot: 'breakfast', dish: 'Cottage Cheese Pancakes', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['½ cup cottage cheese','½ cup oats','1 egg','vanilla','cinnamon'], macros: { p: 32, c: 40, f: 10, kcal: 380 }, prepMin: 10 },
  { id: 'b23', slot: 'breakfast', dish: 'Chia Pudding', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'plant', ingredients: ['3 tbsp chia seeds','1 cup almond milk','1 scoop plant protein','berries','cinnamon'], macros: { p: 18, c: 35, f: 14, kcal: 340 }, prepMin: 5 },
  { id: 'b24', slot: 'breakfast', dish: 'Tofu Scramble', goals: ['cut','recomp','maintain'], diet: ['vegan'], protein: 'plant', ingredients: ['½ block firm tofu','turmeric','spinach','nutritional yeast','½ avocado'], macros: { p: 25, c: 20, f: 18, kcal: 350 }, prepMin: 10 },
  { id: 'b25', slot: 'breakfast', dish: 'Acai Bowl', goals: ['recomp','maintain','bulk'], diet: ['vegetarian'], protein: 'whey', ingredients: ['acai pack','1 scoop whey','banana','granola','strawberries','peanut butter'], macros: { p: 20, c: 60, f: 12, kcal: 430 }, prepMin: 6 },

  // ── Lunches ─────────────────────────────────────────────────
  { id: 'l1',  slot: 'lunch', dish: 'Grilled Chicken Power Bowl', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken breast','1 cup jasmine rice','2 cups spinach','½ avocado','lemon-tahini drizzle'], macros: { p: 48, c: 55, f: 18, kcal: 580 }, prepMin: 15 },
  { id: 'l2',  slot: 'lunch', dish: 'Tuna Lettuce Wraps', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'fish', ingredients: ['1 can tuna','romaine leaves','¼ cup hummus','1 cup carrots'], macros: { p: 40, c: 30, f: 12, kcal: 390 }, prepMin: 7 },
  { id: 'l3',  slot: 'lunch', dish: 'Turkey & Rice Bowl', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'turkey', ingredients: ['5 oz ground turkey 93/7','¾ cup jasmine rice','½ avocado','pico de gallo'], macros: { p: 42, c: 50, f: 16, kcal: 520 }, prepMin: 12 },
  { id: 'l4',  slot: 'lunch', dish: 'Chicken Caesar (Lite)', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken','romaine','2 tbsp light Caesar','parmesan','whole-wheat croutons'], macros: { p: 50, c: 22, f: 18, kcal: 450 }, prepMin: 10 },
  { id: 'l5',  slot: 'lunch', dish: 'Mediterranean Bowl', goals: ['recomp','maintain','cut'], diet: ['omnivore'], protein: 'chicken', ingredients: ['5 oz chicken','farro','cucumber','feta','olives','tzatziki'], macros: { p: 42, c: 45, f: 18, kcal: 520 }, prepMin: 12 },
  { id: 'l6',  slot: 'lunch', dish: 'Steak Burrito', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['7 oz steak','flour tortilla','1 cup rice','½ cup black beans','cheese','guac'], macros: { p: 55, c: 90, f: 28, kcal: 840 }, prepMin: 15 },
  { id: 'l7',  slot: 'lunch', dish: 'Salmon Salad', goals: ['recomp','maintain','cut'], diet: ['pescatarian'], protein: 'fish', ingredients: ['7 oz salmon','mixed greens','avocado','sweet potato','lemon vinaigrette'], macros: { p: 45, c: 38, f: 22, kcal: 540 }, prepMin: 15 },
  { id: 'l8',  slot: 'lunch', dish: 'Tuna Bowl', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'fish', ingredients: ['1 can tuna','jasmine rice','edamame','kimchi','sesame oil'], macros: { p: 42, c: 50, f: 12, kcal: 480 }, prepMin: 8 },
  { id: 'l9',  slot: 'lunch', dish: 'Chicken Pesto Wrap', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken','whole-wheat wrap','pesto','tomato','mozzarella'], macros: { p: 48, c: 40, f: 18, kcal: 520 }, prepMin: 8 },
  { id: 'l10', slot: 'lunch', dish: 'Buddha Bowl', goals: ['recomp','maintain','cut'], diet: ['vegan'], protein: 'plant', ingredients: ['7 oz tofu','¾ cup quinoa','roasted veg','tahini'], macros: { p: 38, c: 55, f: 18, kcal: 540 }, prepMin: 18 },
  { id: 'l11', slot: 'lunch', dish: 'Korean Beef Bowl', goals: ['recomp','maintain','cut'], diet: ['omnivore'], protein: 'beef', ingredients: ['6 oz lean beef','rice','kimchi','cucumber','sesame'], macros: { p: 45, c: 55, f: 16, kcal: 550 }, prepMin: 18 },
  { id: 'l12', slot: 'lunch', dish: 'Chipotle-Style Bowl', goals: ['bulk'], diet: ['omnivore'], protein: 'chicken', ingredients: ['8 oz chicken','rice','beans','cheese','guac','corn salsa'], macros: { p: 55, c: 95, f: 28, kcal: 860 }, prepMin: 12 },
  { id: 'l13', slot: 'lunch', dish: 'Pasta Bolognese', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['8 oz lean ground beef','2 cups pasta','½ cup marinara','parmesan'], macros: { p: 55, c: 95, f: 25, kcal: 830 }, prepMin: 20 },
  { id: 'l14', slot: 'lunch', dish: 'Burger + Sweet Potato Fries', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['7 oz burger patty','bun','cheese','sweet potato fries'], macros: { p: 50, c: 85, f: 32, kcal: 840 }, prepMin: 18 },
  { id: 'l15', slot: 'lunch', dish: 'Sushi Bowl', goals: ['recomp','maintain','cut'], diet: ['pescatarian'], protein: 'fish', ingredients: ['5 oz salmon','¾ cup sushi rice','cucumber','edamame','soy + ginger'], macros: { p: 38, c: 55, f: 14, kcal: 500 }, prepMin: 12 },
  { id: 'l16', slot: 'lunch', dish: 'Poke Bowl XL', goals: ['bulk'], diet: ['pescatarian'], protein: 'fish', ingredients: ['8 oz tuna','1.5 cups sushi rice','edamame','avocado','spicy mayo'], macros: { p: 50, c: 90, f: 25, kcal: 790 }, prepMin: 10 },
  { id: 'l17', slot: 'lunch', dish: 'Steak Salad', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'beef', ingredients: ['5 oz flank steak','mixed greens','sweet potato cubes','goat cheese','balsamic'], macros: { p: 40, c: 32, f: 18, kcal: 450 }, prepMin: 15 },
  { id: 'l18', slot: 'lunch', dish: 'Turkey Sandwich Stack', goals: ['bulk'], diet: ['omnivore'], protein: 'turkey', ingredients: ['6 oz turkey','2 slices cheese','whole wheat bread','avocado','kettle chips'], macros: { p: 45, c: 75, f: 30, kcal: 760 }, prepMin: 5 },
  { id: 'l19', slot: 'lunch', dish: 'Chicken & Rice Bowl XL', goals: ['bulk'], diet: ['omnivore'], protein: 'chicken', ingredients: ['8 oz chicken','1.5 cups rice','½ avocado','BBQ sauce'], macros: { p: 58, c: 95, f: 18, kcal: 780 }, prepMin: 12 },
  { id: 'l20', slot: 'lunch', dish: 'Shrimp Stir-Fry', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'shellfish', ingredients: ['7 oz shrimp','¾ cup brown rice','2 cups stir-fry veg','1 tbsp sesame oil'], macros: { p: 42, c: 50, f: 14, kcal: 500 }, prepMin: 15 },
  { id: 'l21', slot: 'lunch', dish: 'Falafel Wrap', goals: ['recomp','maintain','bulk'], diet: ['vegetarian'], protein: 'plant', ingredients: ['4 falafel','whole-wheat pita','hummus','cucumber','tomato','tahini'], macros: { p: 20, c: 55, f: 20, kcal: 480 }, prepMin: 10 },
  { id: 'l22', slot: 'lunch', dish: 'Lentil Curry Bowl', goals: ['cut','recomp','maintain'], diet: ['vegan'], protein: 'plant', ingredients: ['1 cup red lentils','tomato curry sauce','½ cup basmati','cilantro'], macros: { p: 25, c: 60, f: 12, kcal: 450 }, prepMin: 25 },
  { id: 'l23', slot: 'lunch', dish: 'Cobb Salad', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['5 oz chicken','romaine','2 hard-boiled eggs','blue cheese','bacon bits','vinaigrette'], macros: { p: 45, c: 18, f: 25, kcal: 480 }, prepMin: 12 },
  { id: 'l24', slot: 'lunch', dish: 'Banh Mi Bowl', goals: ['recomp','maintain','cut'], diet: ['omnivore'], protein: 'pork', ingredients: ['5 oz pork tenderloin','jasmine rice','pickled veg','cilantro','sriracha mayo'], macros: { p: 42, c: 55, f: 15, kcal: 530 }, prepMin: 18 },
  { id: 'l25', slot: 'lunch', dish: 'Asian Salmon Bowl', goals: ['recomp','maintain','cut'], diet: ['pescatarian'], protein: 'fish', ingredients: ['6 oz salmon','¾ cup brown rice','edamame','scallions','soy-ginger glaze'], macros: { p: 45, c: 50, f: 20, kcal: 560 }, prepMin: 18 },

  // ── Dinners ─────────────────────────────────────────────────
  { id: 'd1',  slot: 'dinner', dish: 'Sirloin Steak + Sweet Potato', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'beef', ingredients: ['6 oz sirloin','1 medium sweet potato','2 cups roasted broccoli','1 tbsp olive oil'], macros: { p: 45, c: 45, f: 18, kcal: 530 }, prepMin: 20 },
  { id: 'd2',  slot: 'dinner', dish: 'Salmon + Quinoa', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'fish', ingredients: ['6 oz salmon','¾ cup quinoa','1 cup asparagus','lemon'], macros: { p: 42, c: 40, f: 22, kcal: 530 }, prepMin: 18 },
  { id: 'd3',  slot: 'dinner', dish: 'Baked Cod + Potato', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'fish', ingredients: ['7 oz cod','6 oz red potatoes','green beans','1 tbsp butter'], macros: { p: 45, c: 35, f: 12, kcal: 430 }, prepMin: 22 },
  { id: 'd4',  slot: 'dinner', dish: 'Shrimp Scampi (Light)', goals: ['recomp','maintain','cut'], diet: ['pescatarian'], protein: 'shellfish', ingredients: ['7 oz shrimp','1 cup zucchini noodles + ½ cup pasta','garlic-butter sauce'], macros: { p: 48, c: 40, f: 18, kcal: 520 }, prepMin: 18 },
  { id: 'd5',  slot: 'dinner', dish: 'Chicken Fajitas', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken','peppers/onions','2 corn tortillas','salsa','Greek yogurt as sour cream'], macros: { p: 48, c: 42, f: 14, kcal: 490 }, prepMin: 18 },
  { id: 'd6',  slot: 'dinner', dish: 'Salmon, Rice, Veg', goals: ['bulk'], diet: ['pescatarian'], protein: 'fish', ingredients: ['8 oz salmon','1.5 cups jasmine rice','2 cups veg','1 tbsp olive oil'], macros: { p: 55, c: 90, f: 26, kcal: 820 }, prepMin: 18 },
  { id: 'd7',  slot: 'dinner', dish: 'Beef Stir-Fry', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['8 oz lean beef','1.5 cups rice','2 cups veg','1 tbsp sesame oil','soy sauce'], macros: { p: 55, c: 95, f: 25, kcal: 830 }, prepMin: 18 },
  { id: 'd8',  slot: 'dinner', dish: 'Chicken Thigh Curry', goals: ['bulk'], diet: ['omnivore'], protein: 'chicken', ingredients: ['8 oz chicken thigh','1.5 cups rice','coconut milk curry','naan'], macros: { p: 50, c: 95, f: 30, kcal: 860 }, prepMin: 25 },
  { id: 'd9',  slot: 'dinner', dish: 'Turkey Chili', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'turkey', ingredients: ['6 oz ground turkey','½ cup kidney beans','tomato','spices','¼ avocado'], macros: { p: 45, c: 35, f: 14, kcal: 450 }, prepMin: 25 },
  { id: 'd10', slot: 'dinner', dish: 'Chicken Parm (Lite)', goals: ['recomp','maintain','cut'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken','¾ cup chickpea pasta','½ cup marinara','¼ cup mozzarella','basil'], macros: { p: 55, c: 48, f: 14, kcal: 540 }, prepMin: 25 },
  { id: 'd11', slot: 'dinner', dish: 'Pork Tenderloin + Apples', goals: ['recomp','maintain','cut'], diet: ['omnivore'], protein: 'pork', ingredients: ['6 oz pork tenderloin','roasted apples','1 cup wild rice','rosemary'], macros: { p: 45, c: 40, f: 15, kcal: 480 }, prepMin: 25 },
  { id: 'd12', slot: 'dinner', dish: 'Lemon Herb Chicken Thighs', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken thigh','roasted Brussels sprouts','½ cup farro','lemon'], macros: { p: 48, c: 25, f: 22, kcal: 490 }, prepMin: 30 },
  { id: 'd13', slot: 'dinner', dish: 'Sheet-Pan Chicken & Veg', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'chicken', ingredients: ['6 oz chicken','broccoli','bell peppers','red onion','olive oil'], macros: { p: 45, c: 30, f: 15, kcal: 440 }, prepMin: 25 },
  { id: 'd14', slot: 'dinner', dish: 'Bison Burgers (No Bun) + Salad', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'beef', ingredients: ['6 oz bison patty','mixed greens','tomato','½ avocado','olive oil'], macros: { p: 42, c: 20, f: 18, kcal: 410 }, prepMin: 15 },
  { id: 'd15', slot: 'dinner', dish: 'Cod Tacos', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'fish', ingredients: ['7 oz cod','2 corn tortillas','cabbage slaw','avocado','lime crema'], macros: { p: 45, c: 45, f: 18, kcal: 530 }, prepMin: 18 },
  { id: 'd16', slot: 'dinner', dish: 'Asian Glazed Salmon', goals: ['recomp','maintain','cut'], diet: ['pescatarian'], protein: 'fish', ingredients: ['6 oz salmon','¾ cup jasmine rice','bok choy','soy-honey glaze'], macros: { p: 45, c: 40, f: 20, kcal: 520 }, prepMin: 20 },
  { id: 'd17', slot: 'dinner', dish: 'BBQ Chicken Plate', goals: ['bulk'], diet: ['omnivore'], protein: 'chicken', ingredients: ['8 oz chicken','mac & cheese','cornbread','collards'], macros: { p: 55, c: 95, f: 28, kcal: 860 }, prepMin: 25 },
  { id: 'd18', slot: 'dinner', dish: 'Ribeye + Loaded Potato', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['8 oz ribeye','baked potato','butter','cheese','salad'], macros: { p: 55, c: 70, f: 38, kcal: 850 }, prepMin: 25 },
  { id: 'd19', slot: 'dinner', dish: 'Lasagna + Garlic Bread', goals: ['bulk'], diet: ['omnivore'], protein: 'beef', ingredients: ['Italian beef lasagna','garlic bread','side salad'], macros: { p: 50, c: 90, f: 30, kcal: 840 }, prepMin: 30 },
  { id: 'd20', slot: 'dinner', dish: 'Pizza Night', goals: ['bulk'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['½ medium pizza','side salad'], macros: { p: 38, c: 90, f: 32, kcal: 800 }, prepMin: 20 },
  { id: 'd21', slot: 'dinner', dish: 'Zucchini Noodle Shrimp', goals: ['cut','recomp','maintain'], diet: ['pescatarian'], protein: 'shellfish', ingredients: ['7 oz shrimp','2 zucchini spiralized','garlic','olive oil','parmesan'], macros: { p: 38, c: 25, f: 14, kcal: 380 }, prepMin: 15 },
  { id: 'd22', slot: 'dinner', dish: 'Chickpea Coconut Curry', goals: ['recomp','maintain','cut'], diet: ['vegan'], protein: 'plant', ingredients: ['1 cup chickpeas','½ can light coconut milk','tomato','spinach','½ cup basmati'], macros: { p: 22, c: 55, f: 18, kcal: 480 }, prepMin: 20 },
  { id: 'd23', slot: 'dinner', dish: 'Black Bean Stew', goals: ['cut','recomp','maintain'], diet: ['vegan'], protein: 'plant', ingredients: ['1.5 cups black beans','tomato','peppers','½ cup brown rice','lime'], macros: { p: 28, c: 55, f: 10, kcal: 430 }, prepMin: 25 },
  { id: 'd24', slot: 'dinner', dish: 'Lamb Kebabs', goals: ['recomp','maintain','bulk'], diet: ['omnivore'], protein: 'lamb', ingredients: ['7 oz lamb','couscous','tzatziki','roasted veg'], macros: { p: 48, c: 45, f: 22, kcal: 580 }, prepMin: 25 },
  { id: 'd25', slot: 'dinner', dish: 'Turkey Meatballs + Pasta', goals: ['recomp','maintain','cut'], diet: ['omnivore'], protein: 'turkey', ingredients: ['7 oz turkey meatballs','1 cup chickpea pasta','marinara','parmesan'], macros: { p: 50, c: 55, f: 16, kcal: 570 }, prepMin: 22 },

  // ── Snacks ──────────────────────────────────────────────────
  { id: 's1',  slot: 'snack', dish: 'Greek Yogurt + Almonds', goals: ['cut','recomp','maintain','bulk'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup nonfat Greek yogurt','15 almonds','1 tsp honey'], macros: { p: 25, c: 18, f: 10, kcal: 260 }, prepMin: 2 },
  { id: 's2',  slot: 'snack', dish: 'Cottage Cheese Bowl', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup cottage cheese','½ cup pineapple','cinnamon'], macros: { p: 28, c: 20, f: 4, kcal: 230 }, prepMin: 1 },
  { id: 's3',  slot: 'snack', dish: 'Apple + Whey', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'whey', ingredients: ['1 medium apple','1 scoop whey w/ water'], macros: { p: 25, c: 25, f: 1, kcal: 210 }, prepMin: 1 },
  { id: 's4',  slot: 'snack', dish: 'Protein Shake', goals: ['cut','recomp','maintain','bulk'], diet: ['vegetarian'], protein: 'whey', ingredients: ['2 scoops whey','1 cup almond milk'], macros: { p: 50, c: 8, f: 4, kcal: 270 }, prepMin: 1 },
  { id: 's5',  slot: 'snack', dish: 'Hard-Boiled Eggs + Pickles', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'eggs', ingredients: ['2 hard-boiled eggs','dill pickles','sea salt'], macros: { p: 14, c: 4, f: 10, kcal: 160 }, prepMin: 1 },
  { id: 's6',  slot: 'snack', dish: 'Beef Jerky + Fruit', goals: ['cut','recomp','maintain'], diet: ['omnivore'], protein: 'beef', ingredients: ['1 oz beef jerky','1 orange'], macros: { p: 20, c: 18, f: 2, kcal: 170 }, prepMin: 1 },
  { id: 's7',  slot: 'snack', dish: 'Rice Cakes + Almond Butter', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'plant', ingredients: ['2 rice cakes','1 tbsp almond butter','banana slices'], macros: { p: 8, c: 32, f: 9, kcal: 240 }, prepMin: 2 },
  { id: 's8',  slot: 'snack', dish: 'PB Banana Toast', goals: ['bulk'], diet: ['vegetarian'], protein: 'plant', ingredients: ['2 slices bread','3 tbsp peanut butter','banana','honey'], macros: { p: 22, c: 70, f: 26, kcal: 600 }, prepMin: 3 },
  { id: 's9',  slot: 'snack', dish: 'Trail Mix + Shake', goals: ['bulk'], diet: ['vegetarian'], protein: 'whey', ingredients: ['½ cup trail mix','1 scoop whey','1 cup whole milk'], macros: { p: 32, c: 45, f: 22, kcal: 510 }, prepMin: 1 },
  { id: 's10', slot: 'snack', dish: 'Cottage Cheese + Pineapple', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup cottage cheese','½ cup pineapple'], macros: { p: 28, c: 18, f: 4, kcal: 220 }, prepMin: 1 },
  { id: 's11', slot: 'snack', dish: 'Protein Bar + Apple', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'whey', ingredients: ['1 protein bar','1 apple'], macros: { p: 20, c: 30, f: 8, kcal: 270 }, prepMin: 1 },
  { id: 's12', slot: 'snack', dish: 'Whey + Banana', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'whey', ingredients: ['1 scoop whey','1 banana'], macros: { p: 25, c: 30, f: 1, kcal: 230 }, prepMin: 1 },
  { id: 's13', slot: 'snack', dish: 'Edamame + Salt', goals: ['cut','recomp','maintain'], diet: ['vegan'], protein: 'plant', ingredients: ['1 cup edamame','flaky salt'], macros: { p: 17, c: 14, f: 8, kcal: 200 }, prepMin: 4 },
  { id: 's14', slot: 'snack', dish: 'Roasted Chickpeas', goals: ['cut','recomp','maintain'], diet: ['vegan'], protein: 'plant', ingredients: ['½ cup roasted chickpeas','olive oil','spice blend'], macros: { p: 10, c: 25, f: 4, kcal: 180 }, prepMin: 1 },
  { id: 's15', slot: 'snack', dish: 'Greek Yogurt + Honey', goals: ['cut','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup Greek yogurt','1 tsp honey','walnuts'], macros: { p: 24, c: 22, f: 8, kcal: 260 }, prepMin: 1 },

  // ── Pre-bed (mostly bulk; a couple light options for cut nights with a tight macro shortfall) ─
  { id: 'p1',  slot: 'pre_bed', dish: 'Casein + Almonds', goals: ['bulk','recomp'], diet: ['vegetarian'], protein: 'casein', ingredients: ['1 scoop casein','20 almonds'], macros: { p: 30, c: 8, f: 14, kcal: 280 }, prepMin: 1 },
  { id: 'p2',  slot: 'pre_bed', dish: 'Cottage Cheese + Honey', goals: ['bulk','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup cottage cheese','1 tbsp honey'], macros: { p: 28, c: 22, f: 4, kcal: 240 }, prepMin: 1 },
  { id: 'p3',  slot: 'pre_bed', dish: 'Greek Yogurt + Granola', goals: ['bulk','recomp'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup Greek yogurt','⅓ cup granola','berries'], macros: { p: 28, c: 38, f: 8, kcal: 340 }, prepMin: 1 },
  { id: 'p4',  slot: 'pre_bed', dish: 'Casein Pudding', goals: ['bulk','recomp','maintain'], diet: ['vegetarian'], protein: 'casein', ingredients: ['1 scoop casein','milk','cocoa powder'], macros: { p: 28, c: 14, f: 6, kcal: 220 }, prepMin: 2 },
  { id: 'p5',  slot: 'pre_bed', dish: 'Milk + Protein Cookies', goals: ['bulk'], diet: ['vegetarian'], protein: 'whey', ingredients: ['1 cup whole milk','2 protein cookies'], macros: { p: 28, c: 35, f: 14, kcal: 380 }, prepMin: 1 },
  { id: 'p6',  slot: 'pre_bed', dish: 'Casein Smoothie', goals: ['bulk','recomp'], diet: ['vegetarian'], protein: 'casein', ingredients: ['1 scoop casein','frozen berries','milk'], macros: { p: 30, c: 20, f: 6, kcal: 260 }, prepMin: 2 },
  { id: 'p7',  slot: 'pre_bed', dish: 'Casein + PB', goals: ['bulk','recomp'], diet: ['vegetarian'], protein: 'casein', ingredients: ['1 scoop casein','1 tbsp PB','milk'], macros: { p: 32, c: 12, f: 12, kcal: 290 }, prepMin: 1 },
  { id: 'p8',  slot: 'pre_bed', dish: 'Cottage Cheese + Berries', goals: ['bulk','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup cottage cheese','berries'], macros: { p: 26, c: 14, f: 4, kcal: 200 }, prepMin: 1 },
  { id: 'p9',  slot: 'pre_bed', dish: 'Pumpkin Casein Pudding', goals: ['bulk','recomp'], diet: ['vegetarian'], protein: 'casein', ingredients: ['1 scoop casein','¼ cup pumpkin purée','pumpkin spice','milk'], macros: { p: 28, c: 20, f: 5, kcal: 240 }, prepMin: 2 },
  { id: 'p10', slot: 'pre_bed', dish: 'Late-Night Greek Yogurt Parfait', goals: ['bulk','recomp','maintain'], diet: ['vegetarian'], protein: 'dairy', ingredients: ['1 cup Greek yogurt','½ cup oats','berries','cinnamon'], macros: { p: 25, c: 30, f: 6, kcal: 280 }, prepMin: 2 },
];

const PLAN_NAMES = {
  cut: 'Lean Out Plan',
  bulk: 'Lean Mass Plan',
  recomp: 'Body Recomposition Plan',
  maintain: 'Maintenance Plan',
};

export const mealPlanName = (kind) => PLAN_NAMES[kind] || PLAN_NAMES.maintain;

const SLOT_LABEL = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
  pre_bed: 'Pre-Bed',
};

const SLOTS_BY_KIND = {
  cut: ['breakfast', 'lunch', 'snack', 'dinner'],
  bulk: ['breakfast', 'lunch', 'snack', 'dinner', 'pre_bed'],
  recomp: ['breakfast', 'lunch', 'snack', 'dinner'],
  maintain: ['breakfast', 'lunch', 'snack', 'dinner'],
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ── Deterministic RNG so the same seed always builds the same week ──
function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Build a 7-day plan from the pool. The same `seedKey` always yields the same week.
// Avoids same-dish repeats inside a week and discourages back-to-back same-protein days.
export function buildWeek(kind, seedKey = 'default') {
  const rng = mulberry32(hashSeed(seedKey));
  const slots = SLOTS_BY_KIND[kind] || SLOTS_BY_KIND.maintain;

  // Group eligible meals by slot
  const slotPool = {};
  for (const slot of new Set(slots)) {
    const eligible = MEAL_POOL.filter((m) => m.slot === slot && m.goals.includes(kind));
    slotPool[slot] = shuffle(eligible.length ? eligible : MEAL_POOL.filter((m) => m.slot === slot), rng);
  }

  const usedIds = new Set();
  const meals = {};
  let lastProtein = null;

  for (let d = 0; d < 7; d++) {
    const dayMeals = [];
    for (const slot of slots) {
      const pool = slotPool[slot];
      // Prefer unused first, then prefer different protein from previous day's main slots.
      let pick = pool.find((m) => !usedIds.has(m.id) && m.protein !== lastProtein);
      if (!pick) pick = pool.find((m) => !usedIds.has(m.id));
      if (!pick) {
        // Pool exhausted — restart with a fresh shuffle and reset the slot's used set.
        slotPool[slot] = shuffle(pool, rng);
        for (const m of slotPool[slot]) usedIds.delete(m.id);
        pick = slotPool[slot][0];
      }
      usedIds.add(pick.id);
      if (slot === 'lunch' || slot === 'dinner') lastProtein = pick.protein;

      dayMeals.push(formatMeal(pick));
    }
    meals[DAYS[d]] = dayMeals;
  }

  return meals;
}

// Shape a pool entry for storage in the dashboard plan.
export function formatMeal(m) {
  return {
    id: m.id,
    slot: m.slot,
    name: SLOT_LABEL[m.slot],
    dish: m.dish,
    ingredients: m.ingredients,
    macros: m.macros,
    prepMin: m.prepMin,
  };
}

// Pick a different meal for the same slot. Prefers candidates that aren't already
// used elsewhere in the week. Falls back to any same-slot meal that isn't `currentId`.
export function pickAlternateMeal({ slot, kind, currentId, excludeIds }) {
  const exclude = excludeIds instanceof Set ? excludeIds : new Set(excludeIds || []);
  const sameSlotKind = MEAL_POOL.filter((m) => m.slot === slot && m.goals.includes(kind) && m.id !== currentId);
  let candidates = sameSlotKind.filter((m) => !exclude.has(m.id));
  if (candidates.length === 0) candidates = sameSlotKind;
  if (candidates.length === 0) candidates = MEAL_POOL.filter((m) => m.slot === slot && m.id !== currentId);
  if (candidates.length === 0) return null;
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  return formatMeal(pick);
}

// Apply persisted meal overrides on top of a generated week.
// `overrides` keyed by `${day}-${mealIndex}` → meal id from the pool.
export function applyOverrides(meals, overrides) {
  if (!overrides || typeof overrides !== 'object') return meals;
  const out = { ...meals };
  for (const [key, mealId] of Object.entries(overrides)) {
    const lastDash = key.lastIndexOf('-');
    if (lastDash < 0) continue;
    const day = key.slice(0, lastDash);
    const idx = Number(key.slice(lastDash + 1));
    if (!out[day] || !Number.isFinite(idx) || !out[day][idx]) continue;
    const meal = MEAL_POOL.find((m) => m.id === mealId);
    if (!meal) continue;
    out[day] = out[day].map((m, i) => (i === idx ? formatMeal(meal) : m));
  }
  return out;
}

// Sum macros for a day (used by dashboard sections)
export function sumDay(meals) {
  return meals.reduce(
    (acc, m) => ({
      p: acc.p + m.macros.p,
      c: acc.c + m.macros.c,
      f: acc.f + m.macros.f,
      kcal: acc.kcal + m.macros.kcal,
    }),
    { p: 0, c: 0, f: 0, kcal: 0 }
  );
}

// ISO-week number — used to rotate plans week-over-week
export function isoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
