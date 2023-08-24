#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D backbuffer0;
uniform sampler2D uVelTex;
uniform sampler2D uVelNeighborTex;
uniform sampler2D uDepthTexture;

uniform vec2 uResolution;

layout (location = 0) out vec4 outColor;

#define SAMPLE 8

float cone( vec2 x, vec2 y, vec2 v ) {

	return clamp( 1.0 - length( x- y ) / length( v ), 0.0, 1.0 ); 
	
}

float cylinder( vec2 x, vec2 y, vec2 v ) {
	
	return 1.0 - smoothstep( 0.95 * length( v ), 1.05 * length( v ), length( x - y ) );

}

float softDepthCompare( float a, float b ) {

	return clamp( 1.0 - (a - b) / 0.1, 0.0, 1.0 );

}

void main(void) {
	
	vec2 X = vUv;
	
	vec2 coord = vec2( gl_FragCoord.xy );

	vec2 velNeighbor = texture( uVelNeighborTex, X ).xy;

	vec3 sum = vec3( 0.0 );
	float weight = 0.0;

	weight = 1.0 / length( texture( uVelTex, X ).xy );
	sum = texture(backbuffer0, X ).xyz * weight;

	for( int i = 0; i < SAMPLE; i++ ) {

		if( i == SAMPLE - 1 / 2 ) continue;

		float j = 0.0; //jitter

		float t = mix( -1.0, 1.0, ( float( i ) + j + 1.0 ) / ( float(SAMPLE) + 1.0 ) );

		vec2 Y = X + velNeighbor * t;

		float depthX = texture( uDepthTexture, X ).x;
		float depthY = texture( uDepthTexture, Y ).x;

		float f = softDepthCompare( depthX, depthY );
		float b = softDepthCompare( depthX, depthY );

		float alphaY = f * cone( Y, X, texture( uVelTex, Y ).xy ) +
			b * cone( X, Y, texture( uVelTex, X ).xy ) +
			cylinder( Y, X, texture( uVelTex, Y ).xy ) * cylinder( X, Y, texture( uVelTex, X ).xy ) * 2.0;

		weight += alphaY;
		sum += alphaY * texture( backbuffer0, Y ).xyz;

	}

	sum /= weight;
	outColor = vec4(sum, 1.0);

}