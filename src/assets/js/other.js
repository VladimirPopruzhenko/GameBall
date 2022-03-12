const { Engine, Render, World, Bodies, Body, Runner } = Matter;
        const engine = Engine.create();
        const render = Render.create({
        element: document.getElementById("game-container"),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false, // Draw the shapes as solid colors
            background: "#f4f4f8"
        }
});


const rectangle = Bodies.rectangle(400, 0, 120, 80, { restitution: 0.25, angle: Math.PI / 4 });

// Create an immovable rectangle at the bottom of the screen that will act as the floor
const floor = Bodies.rectangle(400, 575, 800, 50, { isStatic: true });

// Add the newly minted bodies to our physics simulation
World.add(engine.world, [rectangle, floor]);

// Kick off the simulation and the render loops
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);
