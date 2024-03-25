document.addEventListener('DOMContentLoaded', function() {
    const shapes = [
        { color: 'rgb(255, 0, 0)', id: 1 },
        { color: 'rgb(0, 255, 0)', id: 2 },
        { color: 'rgb(0, 0, 255)', id: 3 },
        { color: 'rgb(255, 0, 255)', id: 3 },
        { color: 'rgb(0, 255, 255)', id: 3 },
        { color: 'rgb(255, 255, 0)', id: 3 },
    ];

    const sidenav = d3.select('#sidenav');
    const dropArea = d3.select('#drop-area');

    
    function initShapes() {
        sidenav.selectAll('.shape')
            .data(shapes, d => d.id)
            .join('div')
                .attr('class', 'shape')
                .style('background-color', d => d.color)
                .on('mousedown', function(event, d) {
                    event.preventDefault();

                    const mouseX = event.clientX;
                    const mouseY = event.clientY;
                    const shape = d3.select(this);

                    const clone = shape.clone(true)
                                      .style('position', 'absolute')
                                      .style('left', mouseX + 'px')
                                      .style('top', mouseY + 'px')
                                      .style('opacity', 1);

                    dropArea.node().appendChild(clone.node());

                    const onMove = (event) => {
                        clone.style('left', event.clientX - 50 + 'px') // Adjust these values as needed
                        .style('width', '220px') // Increase width
                        .style('height', '220px') 
                             .style('top', event.clientY - 50 + 'px');
                    };

                    const onUp = () => {
                        document.removeEventListener('mousemove', onMove);
                        document.removeEventListener('mouseup', onUp);
                        applyDragBehavior(clone); // Enable dragging for the dropped shape
                        clone.style('opacity', 1);
                    };

                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                });
    }

    initShapes();

    function applyDragBehavior(selection) {
        selection
            .on('mousedown', function(event, d) {
                event.preventDefault(); // Prevent text selection on drag
    
                // Make sure to capture the initial positions correctly
                const initialX = event.clientX;
                const initialY = event.clientY;
                const elem = d3.select(this);
                
                const initialElemX = parseFloat(elem.style('left'));
                const initialElemY = parseFloat(elem.style('top'));
    
                const onMove = (moveEvent) => {
                    // Calculate new position
                    const dx = moveEvent.clientX - initialX;
                    const dy = moveEvent.clientY - initialY;
    
                    // Update position
                    elem.style('left', `${initialElemX + dx}px`)
                        .style('top', `${initialElemY + dy}px`);
                };
    
                const onUp = () => {
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };
    
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('blendModeSelector');
    selector.addEventListener('change', function() {
        const blendMode = this.value;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(function(shape) {
            shape.style.mixBlendMode = blendMode;
        });
    });
});