# 3D Components - Darth Vader Portfolio

This directory contains all the 3D components used in the Darth Lisan portfolio website, built with Three.js and React Three Fiber.

## DarthVaderModel Component

### Overview

The `DarthVaderModel` component is the centerpiece 3D model that loads and displays an authentic Darth Vader GLTF model with enhanced Star Wars theming and animations.

### Features

- **Authentic 3D Model**: Uses the actual Darth Vader GLTF model from Sketchfab
- **Interactive Animations**: Mouse tracking, hover effects, and click interactions
- **Dark Side Effects**: Red Sith lighting, dark aura, force field effects
- **Performance Optimized**: GPU acceleration, efficient materials, and proper cleanup
- **Mobile Responsive**: Adaptive quality based on device capabilities

### Usage

```tsx
import DarthVaderModel from "@/components/3d/DarthVaderModel";

// Basic usage
<DarthVaderModel />

// Advanced usage with props
<DarthVaderModel
  position={[0, -0.5, 0]}
  scale={0.5}
  rotation={[0, 0, 0]}
  interactive={true}
  isHovered={false}
/>
```

### Props

- `position?: [number, number, number]` - 3D position in world space (default: [0, 0, 0])
- `scale?: number` - Uniform scale factor (default: 1)
- `rotation?: [number, number, number]` - Euler rotation angles (default: [0, 0, 0])
- `isHovered?: boolean` - Enhanced effects when hovered (default: false)
- `interactive?: boolean` - Enable mouse interactions (default: true)

### Model Files

The 3D model files are located in the `/public/darthvader/` directory:

- `scene.gltf` - Main GLTF model file
- `scene.bin` - Binary data file
- `textures/` - Texture files directory
- `license.txt` - CC-BY-4.0 license information

### Implementation Details

#### Loading System

- Uses `useGLTF` hook from @react-three/drei for efficient loading
- Preloads model for better performance
- Scene cloning prevents conflicts with multiple instances
- Suspense boundary with fallback component

#### Materials Enhancement

- Darkens original materials for menacing appearance
- Adds metallic properties and roughness adjustments
- Subtle red emissive glow for dark side energy
- Proper shadow casting and receiving

#### Animations

- Slow, menacing rotation (0.15 rad/s)
- Floating motion with sine wave
- Breathing effect with subtle scaling
- Interactive tilt on hover
- Lightsaber-like lighting pulses

#### Lighting Effects

- Multiple point lights with different colors
- Red Sith lighting from multiple angles
- Pulsing intensity and color variations
- Atmospheric lighting for depth

#### Visual Effects

- Dark side aura with transparency and blending
- Force field torus ring around the model
- Dark energy particles using Sparkles component
- Enhanced red lighting system

### Performance Optimization

- GPU-accelerated rendering with proper willChange properties
- Efficient geometry and material reuse
- Proper cleanup on unmount to prevent memory leaks
- Adaptive quality based on device performance
- Mobile-specific optimizations

### Integration in Hero Section

The model is prominently featured in the hero section:

- Center stage positioning with dramatic lighting
- Interactive click to activate "Force mode"
- Dynamic UI feedback based on interaction state
- Background star field and atmospheric effects

### Browser Compatibility

- Modern browsers with WebGL support
- Progressive enhancement for devices without 3D support
- Fallback components for loading states

### Troubleshooting

If the model doesn't load:

1. Check that model files are in `/public/darthvader/`
2. Verify the basePath configuration in `next.config.js`
3. Ensure proper GLTF file structure and references
4. Check browser console for WebGL or loading errors

### License

The Darth Vader 3D model is licensed under CC-BY-4.0:

- Original model by fred346b on Sketchfab
- Source: Star Wars Galaxies - Darth Vader
- License allows commercial and non-commercial use with attribution

## Other 3D Components

### DarthVaderHelmet

Legacy geometric Darth Vader helmet built with primitive shapes.

### SVG Components

- `SVGDarthVader` - 2D SVG illustration
- `EnhancedSVGDarthVader` - Interactive SVG with animations

### Scene Components

- `InteractiveHeroScene` - Complex hero background scene
- `HeroBackground3D` - Simplified hero background
- `Scene3D` - General 3D scene wrapper

### Effects Components

- `FlyingSpaceship` - Animated TIE Fighter and X-Wing models
- `ParticleField` - Star field particle system
- `ImperialShips` - Background fleet animations

## Development Notes

### Adding New Models

1. Place GLTF files in `/public/` directory
2. Create new component extending base patterns
3. Use proper loading, error handling, and cleanup
4. Add mobile optimizations and fallbacks

### Performance Best Practices

- Always use `useGLTF.preload()` for better loading
- Clone scenes when using multiple instances
- Implement proper cleanup in useEffect
- Use `frameloop="demand"` for static scenes
- Optimize materials and textures for web

### Mobile Considerations

- Reduce polygon count for mobile devices
- Use texture compression when possible
- Implement LOD (Level of Detail) systems
- Provide CSS-only fallbacks for low-end devices
