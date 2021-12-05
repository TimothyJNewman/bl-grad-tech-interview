# Where's my robot?

This app features a virtual robot on a 5x5 grid that can be controlled by text commands. It was created using create-react-app.

It was tested with 

    // to test for move()
    place(0, 0, 'NORTH')
    move()
    move()
    report() => Output: 0, 2, NORTH

    // to test for left()
    place(0, 0, 'NORTH')
    left()
    report() => Output: 0, 0, WEST

    // to test for right()
    place(1, 2, 'EAST')
    right()
    report() => Output: 1, 2, SOUTH

    // to test for commands igored before 1st place command
    move()
    report() => Output: -nil-
    place(2, 2, 'NORTH')
    report() => Output: 2, 2, NORTH

    // to test for place() command outside of grid
    place(0, 0, 'NORTH')
    place(5, 2, 'EAST')
    report() => Output: 0, 0, NORTH

    // to test for limits to move()
    place(4, 0, 'EAST')
    move()
    report() => Output: 0, 0, EAST


## Limitions

  - Input is assumed to be a recognised command

  - For the place() command, there must be a space between arguments and the facing direction string must be all caps with single quotes
