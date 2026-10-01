-- Mock Data
TRUNCATE TABLE photos, posts, comments RESTART IDENTITY;

INSERT INTO photos (title, thumbnail_url) VALUES
  ('Hardtail on the ridge trail', 'https://picsum.photos/seed/ridge-trail/400'),
  ('Fresh skateboard deck', 'https://picsum.photos/seed/skate-deck/400'),
  ('Longboard at sunset', 'https://picsum.photos/seed/longboard-sunset/400'),
  ('Commuter bike, new disc brakes', 'https://picsum.photos/seed/commuter-brakes/400'),
  ('Scooter tailwhip mid-trick', 'https://picsum.photos/seed/scooter-trick/400'),
  ('Group ride at the lake trailhead', 'https://picsum.photos/seed/group-ride/400');

INSERT INTO posts (title, body) VALUES
  ('My first ride on the new trail bike', 'Took the hardtail out to the ridge loop this weekend and it handled the rocky sections way better than my old bike. Already planning the next trip.'),
  ('Best skateboard deck for beginners?', 'Looking to replace my cracked deck. Want something durable that can handle street and light park riding without breaking the bank.'),
  ('Longboard cruising through downtown', 'Nothing beats an evening cruise on the longboard once the streets clear out. Smooth pavement makes all the difference.'),
  ('Upgraded my commuter bike brakes', 'Swapped the stock brakes for hydraulic disc brakes and the stopping power difference in the rain is night and day.'),
  ('Scooter tricks I am finally landing', 'Been practicing tailwhips for a month and finally landed three in a row today. Slow progress but progress.'),
  ('Group ride this Saturday', 'Organizing a casual group ride around the lake trail, all skill levels welcome. Meet at the north entrance at 9am.');

INSERT INTO comments (name, email, body) VALUES
  ('Quan', 'jordan@example.com', 'Great writeup, this convinced me to finally get disc brakes on my own bike.'),
  ('Angel', 'angel@example.com', 'I had the same deck recommended to me, holds up really well on curbs.'),
  ('Sina', 'sina@example.com', 'Count me in for the group ride, I will bring a spare tube in case anyone needs one.'),
  ('Andrew', 'andrew@example.com', 'The ridge loop is one of my favorites too, watch out for the loose gravel near the top.'),
  ('Bethany', 'bethany@example.com', 'Tailwhips took me forever to land consistently, keep at it, it clicks eventually.'),
  ('Jared', 'jared@example.com', 'Evening cruises are the best, way less traffic to worry about.');
