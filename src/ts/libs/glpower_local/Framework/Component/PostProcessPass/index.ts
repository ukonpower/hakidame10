import { gl, power } from '~/ts/Globals';
import { GLPowerFrameBuffer } from '../../../GLPowerFrameBuffer';
import { GLPowerTexture } from '../../../GLPowerTexture';
import { Vector } from '../../../Math/Vector';
import { Material, MaterialParam } from '../Material';

export interface PostProcessPassParam extends MaterialParam{
	// input?: ( GLPowerTexture | null )[],
	renderTarget?: GLPowerFrameBuffer | null,
	clearColor?: Vector;
	clearDepth?: number;
	resolutionFactor?: number;
}

import quadVert from './shaders/quad.vs';
import { ComponentResizeEvent } from '..';

export class PostProcessPass extends Material {

	public renderTarget: GLPowerFrameBuffer | null;

	public clearColor: Vector | null;
	public clearDepth: number | null;

	public resolutionFactor: number;

	constructor( param: PostProcessPassParam ) {

		super( { ...param, vert: param.vert || quadVert } );

		this.renderTarget = param.renderTarget !== undefined ? param.renderTarget : new GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );


		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;
		this.depthTest = param.depthTest !== undefined ? param.depthTest : false;
		this.resolutionFactor = param.resolutionFactor || 1;

	}

	public onAfterRender() {
	}

	protected resizeImpl( event: ComponentResizeEvent ): void {

		if ( this.renderTarget ) {

			this.renderTarget.setSize( event.resolution.clone().multiply( this.resolutionFactor ) );

		}

	}

}
